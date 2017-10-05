var WeponData = require("WeponsData");
cc.Class(
{
    extends:cc.Component,
    properties:{
        weponType:0,
        parentt:null,
        basePos:null,
    },
    onLoad:function()
    {
        this.node.scale = 0;
    },
    start:function()
    {
        let scaleTo = cc.scaleTo(0.1,1.1,1.1);
        let scaleTo1= cc.scaleTo(0.1,1,1);
        let sequence= cc.sequence(scaleTo,scaleTo1);
        this.node.runAction(sequence);
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{this.installWepon()});
    },
    installWepon:function()
    {
        this.parentt.updateInstallState(true);
        cc.loader.loadRes("prefab/wepon/gunturret",cc.Prefab,(err,prefab) => {
            let turrent = cc.instantiate(prefab);
            turrent.getComponent("Gunturrent").setGuntype(this.parentt,this.weponType);
            turrent.setPosition(this.basePos.x,this.basePos.y-80);
            this.parentt.node.addChild(turrent,this.parentt.ZORDER);
            this.parentt.updateInstallState(false);
        });
    },
    showWeponByType:function(type,parentt,pos)
    {
        this.weponType = type;
        this.parentt = parentt;
        this.basePos = pos;
        let frame = WeponData.getSpriteFrameBytype(type);
        if(frame)
        {
            this.getComponent(cc.Sprite).spriteFrame = frame;
        }
        else
        {
            cc.log("frame is null");
        }
    },
    update:function(){},
    onDestroy:function(){},
});