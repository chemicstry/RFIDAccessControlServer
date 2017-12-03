const HelloService = require('./HelloService.js');

class ServiceFactory
{
    constructor(serviceMgr)
    {
        this.serviceMgr = serviceMgr;
    }

    Create(type)
    {
        switch (type)
        {
            case 'hello':
                return new HelloService(this.serviceMgr);
        }

        return null;
    }
}

module.exports = ServiceFactory;
