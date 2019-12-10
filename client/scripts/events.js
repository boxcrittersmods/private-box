class BCEvent
{
	constructor (name)
	{
		console.log(name);
		this.listeners = new Array();
		this.name = name;
	}
}

class BCEventHandler
{
	constructor ()
	{
		this.events = new Object();
	}

	dispatchEvent(name, data)
	{
		if (!this.events.hasOwnProperty(name))
		{
			this.events[name] = new BCEvent(name);
		}
		this.events[name].listeners.forEach(function (listener) {
			if(listener)
			{
				listener.call(data);
			}
		});
	}

	addEventListener(name, listener)
	{
		if (!this.events.hasOwnProperty(name))
		{
			this.events[name] = new BCEvent(name);
		}
		this.events[name].listeners.push(listener);
	}

	removeEventListener(name, listener)
	{
		if (this.events.hasOwnProperty(name))
		{	
			this.events[name].listeners = this.events[name].listeners.filter(function (tmp) {
				return tmp.constructor.toString() != listener.constructor.toString();
			});
		}
	}
}
