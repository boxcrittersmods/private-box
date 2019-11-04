var Plugins = {};
var Plugin = function() {
    if(!new.target) {
        console.error("Plugins mnust be created with the 'new' operator.");
        return;
    }
    
    var bcEvents = BoxCritters.eventHandler;
    bcEvents.addEventListener("update",this,this.onUpdate);
    bcEvents.addEventListener("click",this,this.onClick);
    bcEvents.addEventListener("playerJoin",this,this.onClick);
    bcEvents.addEventListener("click",this,this.onClick);
    bcEvents.addEventListener("click",this,this.onClick);
    bcEvents.addEventListener("click",this,this.onClick);

    this.eventHandler = new EventHandler();
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