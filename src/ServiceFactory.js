const Service = require('./Service.js');
const Log = require('./Log.js');
const fs = require('fs');
const path = require('path');

class ServiceFactory
{
    constructor(serviceMgr)
    {
        this.serviceMgr = serviceMgr;
    }

    Create(type)
    {
        if (!ServiceFactory.Types[type])
        {
            Log.error("ServiceFactory::Create(): Type not found", {type});
            return null;
        }

        return new ServiceFactory.Types[type];
    }

    static Register(type, classname)
    {
        if (ServiceFactory.Types[type])
            return Log.error("ServiceFactory::Register(): Type already registered", {type});

        if (!(new classname instanceof Service))
            return Log.error("ServiceFactory::Register(): Class is not instance of Service", {type, classname});

        ServiceFactory.Types[type] = classname;

        Log.verbose("ServiceFactory::Register(): Registered service", {type});
    }

    static InitializeTypes()
    {
        ServiceFactory.Types = [];

        fs.readdir(path.join(__dirname, "Services"), function(err, files)
        {
            for (var file of files)
            {
                // ./Services/ServiceName/ServiceName.js
                var filePath = path.join(__dirname, "Services", file, file + ".js");

                fs.stat(filePath, function(err, stat) {
                    if (!err && stat.isFile())
                    {
                        const classname = require(filePath);
                        ServiceFactory.Register(file, classname);
                    }
                });
            }
        });
    }
}

ServiceFactory.InitializeTypes();

module.exports = ServiceFactory;
