const { BidirectionalDataInterface } = require('./DataInterface.js');
const EventInterface = require('./EventInterface.js');

class Service
{
    constructor(serviceMgr)
    {
        this.serviceMgr = serviceMgr;

        // Create bidirectional data interface for this service
        this.bidirectionalDataInterface = new BidirectionalDataInterface();

        // Use downstream interface
        this.eventInterface = new EventInterface(this.bidirectionalDataInterface.Downstream);
    }

    // Can be implemented in derived class if desired
    OnReady()
    {
    }

    GetUpstreamDataInterface()
    {
        return this.bidirectionalDataInterface.Upstream;
    }
}

module.exports = Service;
