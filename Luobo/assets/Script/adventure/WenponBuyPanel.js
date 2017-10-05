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
        parentt.currentWenponBuyPanel = null;
        this.node.destroy();
    },
    onDestroy:function(){},
});