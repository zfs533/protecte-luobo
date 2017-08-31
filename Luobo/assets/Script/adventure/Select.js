cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },
    start:function()
    {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchEvent,this);
        this.scheduleOnce(this.touchEvent,5);
    },
    setParentt:function(parentt)
    {
        this.parentt = parentt;
    },
    touchEvent:function(event)
    {
        this.parentt.currentSelectedTag = null;
        this.node.destroy();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});