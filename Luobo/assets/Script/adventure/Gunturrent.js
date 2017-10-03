var WeponData = require("WeponsData");
cc.Class({
    extends: cc.Component,

    properties: {
        gunType:0,
        turrent:null,
        gun:null,
        level:1,
        levelTop:3,
        animName:null,
        parentt:null,
    },
    onLoad: function () 
    {
        this.initProperty();
        this.addUI();
    },
    start:function()
    {
        this.refreshGTByLevel(this.level);
    },
    initProperty:function()
    {
        this.animName = [null,null,null];
    },
    addUI:function()
    {
        let turrent = new cc.Node();
        turrent.addComponent(cc.Sprite);
        this.node.addChild(turrent);
        this.turrent = turrent;
        let gun = new cc.Node();
        gun.addComponent(cc.Sprite);
        gun.addComponent(cc.Animation);
        this.node.addChild(gun);
        this.gun = gun;

        this.turrent.on(cc.Node.EventType.TOUCH_END,function()
        {
            this.handleTurrentEvent();
        }.bind(this));

        var rotate = cc.rotateTo(10*Math.random(),360*10,360*10);
        this.gun.runAction(rotate.repeatForever());

    },
    setGuntype:function(parentt,guntype)
    {
        this.parentt = parentt;
        this.gunType = guntype;
    },
    refreshGTByLevel:function(level)
    {
        this.level = level;
        let frameName = WeponData.getNameBytype(this.gunType != 1 ? this.gunType : 0)+"-1"+level;
        this.turrent.getComponent(cc.Sprite).spriteFrame = WeponData.getSpriteFrameByName(this.gunType,frameName);
        let frameGunName = WeponData.getNameBytype(this.gunType)+"1"+level;
        this.gun.getComponent(cc.Sprite).spriteFrame = WeponData.getSpriteFrameByName(this.gunType,frameGunName);
    },
    shoot:function()
    {
        this.playTurrentAnim();
        this.lunchBullet();
    },
    playTurrentAnim:function()
    {
        if(this.animName[this.level])
        {
            this.gun.getComponent(cc.Animation).play(this.animName[this.level]);
        }
        else
        {
            this.addAnimClip();
        }
    },
    addAnimClip:function()
    {
        let node = this.gun;
        var frames = [];
        for(let i = 0; i<this.levelTop;i++)
        {
            let frameName = WeponData.getNameBytype(this.gunType)+this.level+(i+1);
            let frame = WeponData.getSpriteFrameByName(this.gunType,frameName);
            frames.push(frame);
        }
        let clip = cc.AnimationClip.createWithSpriteFrames(frames);
        clip.name = "clip"+this.level;
        clip.speed = 0.3;
        clip.wrapMode = cc.WrapMode.Normal;
        let anim = node.getComponent(cc.Animation);
        anim.addClip(clip);
        anim.play(clip.name);
        this.animName[this.level] = clip.name;
    },
    handleTurrentEvent:function()
    {
        this.parentt.updateInstallState(true);
        // this.gunType = 5;
        // this.level = 1;
        // this.refreshGTByLevel(this.level);
        // this.shoot();
    },
    lunchBullet:function()
    {

    },
    // update: function (dt) {

    // },
});
