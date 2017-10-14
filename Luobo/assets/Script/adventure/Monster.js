var MonsterData = require("MonsterData");
cc.Class(
{
    extends:cc.Component,
    properties:{},
    onLoad:function()
    {
        this.setLocalProperty();
    },
    start:function()
    {
        this.showOrHideBlood(false);
        this.showOrHidePoint(false);
        this.playAnimationByIndex(0);
    },
    setLocalProperty:function()
    {
        this.animationn = this.getComponent(cc.Animation);
        this.pathIndex = 0;
        this.parentt = null;
        this.monsterCount = 0;
        this.bloodSize = 70;
    },
    showOrHideBlood:function(bool)
    {
        let blood = this.node.getChildByName("bloodBar");
        blood.opacity = bool ? 255 : 0;
        if(bool)
        {
            blood.active = true;
            this.scheduleOnce(function()
            {
                blood.opacity = 0;
            }.bind(this),3);
        }
    },
    showOrHidePoint:function(bool)
    {
        let point = this.node.getChildByName("point");
        point.opacity = bool ? 255 : 0;
        if(bool)
        {
            point.active = true;
            this.scheduleOnce(function()
            {
                point.opacity = 0;
            }.bind(this),3);
        }
    },
    playAnimationByIndex:function(index)
    {
        let frames = MonsterData.getMonsterFramesByIndex(index);
        let clip = cc.AnimationClip.createWithSpriteFrames(frames);
        clip.name = "clip";
        clip.speed = 0.1;
        clip.wrapMode = cc.WrapMode.Loop;
        this.animationn.addClip(clip);
        this.animationn.play(clip.name);
    },
    setData:function(path,parentt)
    {
        this.monsterCount = parentt.monsterCount++;
        this.parentt = parentt;
        this.monsterMove(path);
    },
    monsterMove:function(path)
    {
        this.pathIndex++;
        if(this.pathIndex>=path.length)
        {
            this.node.destroy();
            return;
        }
        let moveTo = cc.moveTo(path[this.pathIndex].spd,path[this.pathIndex].pos);
        let callback = cc.callFunc(function()
        {
            this.monsterMove(path);
        }.bind(this),this);
        let sequence = cc.sequence(moveTo,callback);
        this.node.runAction(sequence);
    },
    //销毁回调
    onDestroy:function()
    {
        this.parentt.removeMonsterFromArray(this,this.monsterCount);
    },
    //碰撞检测，前提需要在为节点添加碰撞器
    onCollisionEnter:function(other,self)
    {
        let name = other.node.getName();
        if(name == "bullet")
        {
            let blood = this.node.getChildByName("bloodBar");
            if(blood.opacity == 0)
            {
                this.showOrHideBlood(true);
            }
            var bNum = blood.width-5;
            blood.width = bNum;
            if(bNum<=0)
            {
                this.node.destroy();
            }
        }
    },
    onCollisionStay:function(other,self)
    {

    },
    onCollisionExit:function(other,self)
    {

    },
});