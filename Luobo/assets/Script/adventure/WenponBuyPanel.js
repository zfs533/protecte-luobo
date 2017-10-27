var WeponData = require("WeponsData");
cc.Class(
{
    extends:cc.Component,
    properties:{
        parentt:null,        
    },
    onLoad:function()
    {
        cc.loader.loadRes("prefab/wepon/weponBy",cc.Prefab,function(err,prefab)
        {
            this.initProperty(prefab);
        }.bind(this));
    },
    start:function()
    {
        let self = this;
        this.listeners = { 
            event: cc.EventListener.TOUCH_ONE_BY_ONE, 
            swallowTouches:true,
            onTouchBegan: function (touches, event) {
                self.destroyPanel(self.parentt);
                return true;
            }, 
            onTouchMoved: function (touches, event) { 
                cc.log('Touch Moved: ' + event); 
            }, 
            onTouchEnded: function (touches, event) { 
                cc.log('Touch Ended: ' + event); 
            }
        } 
        // 绑定单点触摸事件 
        cc.eventManager.addListener(this.listeners, this.node);
    },
    setParentt:function(parentt)
    {
        this.parentt = parentt;
    },
    initProperty:function(prefab)
    {
        this.weponPrefab = prefab;
        var gap = 10;
        var turrentArr = [0,1,2];
        for(let i = 0; i < turrentArr.length; i++)
        {
            let wepon = cc.instantiate(prefab);
            wepon.getComponent("WenponBuy").showWeponByType(turrentArr[i],this.parentt,this.node.getPosition());
            wepon.parent = this.node;
            wepon.setPosition((wepon.width+gap)*i -(wepon.width+gap),0);
        }
    },
    destroyPanel:function(parentt)
    {
        this.parentt = parentt;
        if(parentt)
        {
            parentt.currentWenponBuyPanel = null;
            this.parentt = null;
        }
        this.node.destroy();
    },
    onDestroy:function()
    {
    },
});