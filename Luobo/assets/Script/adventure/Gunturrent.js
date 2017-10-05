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
        bullet:null,
        bulletPrefab:null,
        isCanFire:false,
        distance:100,
        pDistance:0,
        gunRotation:0,
        launchType:0,
        isPlayFinished:true,
    },
    onLoad: function () 
    {
        this.initProperty();
        this.addUI();
        this.schedule(this.checkDistance,0.1);
    },
    start:function()
    {
        this.refreshGTByLevel(this.level);
    },
    initProperty:function()
    {
        this.animName = [null,null,null];
        this.distance = 200;
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
    },
    setGuntype:function(parentt,guntype)
    {
        this.parentt = parentt;
        this.gunType = guntype;
        let launchType = WeponData.getLaunchType(guntype);
        this.launchType = launchType;
        //根据发射类型设置炮塔监听器类型
        switch(launchType)
        {
            case WeponData.launchType[0]:
            {
                this.schedule(this.shoot,0.5);
                break;
            }
            case WeponData.launchType[1]:
            {
                this.schedule(this.shoot,0.1);
                break;
            }
            case WeponData.launchType[2]:
            {
                this.schedule(this.shoot,0.5);
                break;
            }
            case WeponData.launchType[3]:
            {
                this.schedule(this.shoot,0.5);
                break;
            }
            default:break;
        }

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
        if(this.isCanFire)
        {
            this.playTurrentAnim();
            this.lunchBullet();
        }
    },
    playTurrentAnim:function()
    {
        if(!this.isPlayFinished){return;}
        this.isPlayFinished = false;
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
        anim.on("finished",() => {
            let frameGunName = WeponData.getNameBytype(this.gunType)+"1"+this.level;
            this.gun.getComponent(cc.Sprite).spriteFrame = WeponData.getSpriteFrameByName(this.gunType,frameGunName);
            this.isPlayFinished = true;
        },this);
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
        if(!this.bulletPrefab)
        {
            cc.loader.loadRes("prefab/wepon/bullet",cc.Prefab,(err,prefab) => {
                this.bulletPrefab = prefab;
                this.createBullet(prefab);
            });
        }
        else
        {
            this.createBullet(this.bulletPrefab);
        }
    },
    createBullet:function(prefab)
    {
        switch(this.launchType)
        {
            case WeponData.launchType[0]:
            {
                this.launchBullet(prefab);
                break;
            }
            case WeponData.launchType[1]:
            {
                if(!this.bullet)
                {
                    this.launchBullet(prefab);
                }
                else
                {
                    this.bullet.getComponent("Bullet").updateRotation(this.gunRotation,this.pDistance);
                }
                break;
            }
            case WeponData.launchType[2]:
            {
                break;
            }
            case WeponData.launchType[3]:
            {
                break;
            }
            default:break;
        }
    },
    launchBullet:function(prefab)
    {
        let bullet = cc.instantiate(prefab);
        var pos = this.gun.convertToWorldSpaceAR(this.gun.getPosition());
        bullet.setPosition(pos.x-cc.winSize.width/2,pos.y-cc.winSize.height/2);
        bullet.getComponent("Bullet").initRotation(this.gunRotation,this.gunType,this.level);
        this.parentt.node.addChild(bullet,this.parentt.ZORDER+1);
        this.bullet = bullet;
    },
    checkDistance:function () 
    {
        if(this.parentt)
        {
            let monsterlist = this.parentt.monsterArr;
            for(let i = 0; i < monsterlist.length; i++)
            {
                let monster = monsterlist[i];
                let p1 = this.node.getPosition();
                let p2 = monster.getPosition();
                let distance = cc.pDistance(p1,p2);
                if(distance<=this.distance)
                {
                    this.isCanFire = true;
                    let pi = Math.atan2(p2.x-p1.x,p2.y-p1.y);
                    let rotation = 180/Math.PI*pi;
                    this.gunRotation = rotation;
                    this.pDistance = distance;
                    if(this.gunType != WeponData.TYPE[1])
                    {
                        this.gun.setRotation(rotation);
                    }
                    return;
                }
            }
            if(this.bullet && this.launchType == WeponData.launchType[1])
            {
                this.bullet.getComponent("Bullet").stopShooting();
            }
            this.isCanFire = false;
        }
    },
});
