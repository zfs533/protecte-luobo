var WeponData = require("WeponsData");
cc.Class({
    extends: cc.Component,
    properties: 
    {
        speed:1,
        varSpX:1,
        varSpY:1,
        bulletType:0,
        level:1,
        levelTop:3,
        launchType:null,//0：发出去；1：持续链接；2：间断链接；3：范围播放(太阳)
        currentLaunchType:0,
        bullet:null,
    },
    onLoad: function ()
    {
        this.speed = 8;
        this.launchType = [0,1,2,3];
    },
    initRotation:function(rotation,type,level)
    {
        if(!this.launchType)
        {
            this.launchType = [0,1,2,3];
        }
        this.node.rotation = rotation;
        this.bulletType = type;
        this.level = level;
        //angle=>PI
        var pi = Math.PI/180*rotation;
        this.varSpX = Math.sin(pi);
        this.varSpY = Math.cos(pi);
        this.addBullet();
    },
    addBullet:function()
    {
        let bullet = new cc.Node();
        bullet.addComponent(cc.Sprite);
        bullet.addComponent(cc.Animation);
        bullet.y = 20;
        this.node.addChild(bullet);
        this.bullet = bullet;
        let frameName ="P" + WeponData.getNameBytype(this.bulletType)+this.level+"1";
        bullet.getComponent(cc.Sprite).spriteFrame = WeponData.getSpriteFrameByName(this.bulletType,frameName);
        this.setBulletAction(bullet);
        if(this.currentLaunchType == this.launchType[1] || this.currentLaunchType == this.launchType[2])
        {
            let sprite = bullet.getComponent(cc.Sprite);
            sprite.type = cc.Sprite.Type.TILED;
            sprite.trim = true;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            bullet.height = 0;
            bullet.setAnchorPoint(0.5,0);
        }
    },
    setBulletAction:function(bullet)
    {
        switch (this.bulletType)
        {
            case WeponData.TYPE[0]:
            {
                this.currentLaunchType = this.launchType[0];
                break;
            }
            case WeponData.TYPE[1]:
            {
                this.currentLaunchType = this.launchType[1];
                this.playAnimationn(bullet,4);
                break;
            }
            case WeponData.TYPE[2]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playActionn(bullet);
                break;
            }
            case WeponData.TYPE[3]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playAnimationn(bullet);
                break;
            }
            case WeponData.TYPE[4]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playActionn(bullet);
                break;
            }
            case WeponData.TYPE[5]:
            {
                this.currentLaunchType = this.launchType[1];
                this.playAnimationn(bullet,2);
                break;
            }
            case WeponData.TYPE[6]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playAnimationn(bullet,2);
                break;
            }
            case WeponData.TYPE[7]://plan
            {
                this.currentLaunchType = this.launchType[2];
                this.playAnimationn(bullet);
                break;
            }
            case WeponData.TYPE[8]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playAnimationn(bullet);
                break;
            }
            case WeponData.TYPE[9]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playAnimationn(bullet,2);
                break;
            }
            case WeponData.TYPE[10]:
            {
                this.currentLaunchType = this.launchType[0];
                this.playActionn(bullet);
                break;
            }
            case WeponData.TYPE[11]:
            {
                this.currentLaunchType = this.launchType[3];
                this.playAnimationn(bullet);
                break;
            }
            default:break;
        }
    },
    playActionn:function(bullet)
    {
        let rotate = cc.rotateBy(1,360,360);
        bullet.runAction(rotate.repeatForever());
    },
    playAnimationn:function(bullet,framsCount)
    {
        let frames = [];
        var count = framsCount ? framsCount : this.levelTop;
        for(let i = 0; i<count;i++)
        {
            let frameName ="P" + WeponData.getNameBytype(this.bulletType)+this.level+(i+1);
            let frame = WeponData.getSpriteFrameByName(this.bulletType,frameName);
            frames.push(frame);
        }
        let clip = cc.AnimationClip.createWithSpriteFrames(frames);
        clip.name = "clip"+this.level;
        clip.speed = 0.3;
        let loop = (this.currentLaunchType == this.launchType[2] || this.currentLaunchType == this.launchType[3])?cc.WrapMode.Normal:cc.WrapMode.Loop;
        clip.wrapMode = loop;
        let anim = bullet.getComponent(cc.Animation);
        anim.addClip(clip);
        anim.play(clip.name);
        anim.on("finished",() => {
            
        },this);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) 
    {
        if(!this.launchType){return;}
        switch (this.currentLaunchType)
        {
            case this.launchType[0]:
            {
                this.node.x += this.speed*this.varSpX;
                this.node.y += this.speed*this.varSpY;
                this.checkBoundary();
                break;
            }
            case this.launchType[1]:
            {
                break;
            }
            case this.launchType[2]:
            {
                break;
            }
            case this.launchType[3]:
            {
                break;
            }
            default:break;
        }
    },
    checkBoundary:function()
    {
        let size = cc.winSize;
        var pos = this.node.getPosition();
        if(pos.x<-size.width/2 || pos.x>size.width/2 || pos.y>size.height/2 || pos.y < -size.height/2)
        {
            this.node.destroy();
        }
    },
    updateRotation:function(rotation,distance)
    {
        this.node.opacity = 255;
        this.node.rotation = rotation;
        this.bullet.height = distance-20;
    },
    stopShooting:function()
    {
        this.node.opacity = 0;
    },
    //销毁回调
    onDestroy:function()
    {
    },
    //碰撞检测，前提需要在为节点添加碰撞器
    onCollisionEnter:function(other,self)
    {
        let name = other.node.getName();
        if(name == "monster")
        {
            this.node.destroy();
        }
    },
    onCollisionStay:function(other,self)
    {

    },
    onCollisionExit:function(other,self)
    {

    },
});
