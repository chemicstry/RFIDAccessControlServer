const EventInterface = require('./EventInterface.js');
const ServiceFactory = require('./ServiceFactory.js');
const Log = require('./Log.js');

class ServiceManager
{
    constructor(dataInterface)
    {
        this.dataInterface = dataInterface;
        this.eventInterface = new EventInterface(dataInterface);
        this.serviceFactory = new ServiceFactory(this);
        this.services = [];

        this.eventInterface.on("svcreg", this.OnServiceRegister.bind(this));
        this.eventInterface.on("svcdata", this.OnServiceData.bind(this));
    }

    OnServiceRegister(args)
    {
        var id = parseInt(args.id);
        var type = args.type;

        Log.verbose("OnServiceRegister()", {id, type});

        if (!Number.isInteger(id))
            return Log.error("OnServiceRegister(): ID is not integer", {id, type});
        
        // Create service based on type
        var service = this.serviceFactory.Create(type);

        if (!service)
            return Log.error("OnServiceRegister(): Failed to create service", {id, type});

        // Save locally
        this.services[id] = service;

        // Bind upstream interface
        service.GetUpstreamDataInterface().SetCb(data => {
            this.SendServiceData(id, data);
        });

        // Call ready event
        service.OnReady();
    }

    // Forwards upstream data to specified service
    OnServiceData(args)
    {
        var id = args.id;
        var data = args.data;

        if (!this.services[id])
            return Log.error("OnServiceData(): Service not found", {id});

        this.services[id].GetUpstreamDataInterface().Send(data);
    }

    SendServiceData(id, data)
    {
        this.eventInterface.Send("svcdata", {id, data});
    }
}

module.exports = ServiceManager;
