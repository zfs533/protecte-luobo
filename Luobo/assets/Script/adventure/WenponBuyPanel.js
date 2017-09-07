var WeponData = require("WeponsData");
cc.Class(
{
    extends:cc.Component,
    properties:{},
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
    initProperty:function(prefab)
    {
        this.weponPrefab = prefab;
        let wepon = cc.instantiate(prefab);
        wepon.parent = this.node;
    },
    onDestroy:function(){},
});