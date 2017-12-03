const Service = require('./Service.js');
const Log = require('./Log.js');

class HelloService extends Service
{
    constructor(serviceMgr)
    {
        super(serviceMgr);

        this.eventInterface.on("hello", this.OnHello.bind(this));
    }

    OnHello(args)
    {
        var text = args.text;

        // text should be "hello"
        Log.info("HelloService::OnHello()", {text});

        // send back
        this.eventInterface.Send("world", {
            'text': text + " world"
        });
    }
}

module.exports = HelloService;
