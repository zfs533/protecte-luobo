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
        this.playAnimationByIndex(0);
    },
    setLocalProperty:function()
    {
        let animation = this.getComponent(cc.Animation);
        this.clips = animation.getClips();
        this.animationn = animation;
        this.maxIndex = this.clips.length;
        this.pathIndex = 0;
    },
    showOrHideBlood:function(bool)
    {
        this.node.getChildByName("bloodBar").opacity = bool ? 255 : 0;
        if(bool)
        {
            this.scheduleOnce(function()
            {
                this.node.getChildByName("bloodBar").opacity = 0;
            }.bind(this),5);
        }
    },
    playAnimationByIndex:function(index)
    {
        if(index>=this.maxIndex)
        {
            index = this.maxIndex-1;
        }
        this.animationn.play(this.clips[index].name);
    },
    setData:function(path)
    {
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
    onDestroy:function()
    {
        cc.log("monster destroy");
    }
});