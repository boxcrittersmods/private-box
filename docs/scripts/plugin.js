var Plugins = {};
var Plugin = function() {
	if(!new.target) {
		console.error("Plugins mnust be created with the 'new' operator.");
		return;
	}

	var bcEvents = BoxCritters.eventHandler;
	bcEvents.addEventListener("ticker", this.onUpdate);
	bcEvents.addEventListener("update", this.onUpdate);
	bcEvents.addEventListener("click", this.onClick);
	bcEvents.addEventListener("playerJoin", this.onClick);

	this.eventHandler = new BCEventHandler();
};
Plugin.LoadPlugin = function(PluginType) {
    console.log("Loading Plugin: ",PluginType.name)
    Plugins[PluginType.name] = new PluginType();
}
Plugin.prototype.onInit = function() {};
Plugin.prototype.onClick = function() {};
Plugin.prototype.onUpdate = function() {};

//Plugin API
(function() {

})();
