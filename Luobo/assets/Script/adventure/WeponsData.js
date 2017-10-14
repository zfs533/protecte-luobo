var Wepon = cc.Class(
{
    ctor:function()
    {
        this.initProperty();
    },
    initProperty:function()
    {
        this.TArrow = null;
        this.TBall = null;
        this.TBlueStar = null;
        this.TBottle = null;
        this.TFan = null;
        this.TFireBottle = null;
        this.TPin = null;
        this.TPlane = null;
        this.TRocket = null;
        this.TShit = null;
        this.TSnow = null;
        this.TSun = null;
        this.launchType = [0,1,2,3];//0：发出去；1：持续链接；2：间断链接；3：范围播放(太阳)；
        this.TYPE = (function()
        {
            let arr = [];
            for(let i = 0;i<12;i++)
            {
                arr.push(i);
            }
            return arr;
        })();
    },
    loadWeponSpriteAtlas:function()
    {
        cc.loader.loadRes("Themes/Towers/TArrow-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TArrow = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TBall-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TBall = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TBlueStar-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TBlueStar = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TBottle-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TBottle = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TFan-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TFan = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TFireBottle-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TFireBottle = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TPin-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TPin = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TPlane-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TPlane = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TRocket-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TRocket = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TShit-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TShit = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TSnow-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TSnow = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Towers/TSun-hd",cc.SpriteAtlas,function(err,atlas)
        {
            this.TSun = atlas;
        }.bind(this));
    },
    getSpriteFrameBytype:function(type)
    {
        let frame = null;
        switch (type)
        {
            case this.TYPE[0]:
            {
                frame = this.TArrow.getSpriteFrame("Arrow01");
                break;
            }
            case this.TYPE[1]:
            {
                frame = this.TBall.getSpriteFrame("Ball01");
                break;
            }
            case this.TYPE[2]:
            {
                frame = this.TBlueStar.getSpriteFrame("BStar01");
                break;
            }
            case this.TYPE[3]:
            {
                frame = this.TBottle.getSpriteFrame("Bottle01");
                break;
            }
            case this.TYPE[4]:
            {
                frame = this.TFan.getSpriteFrame("Fan01");
                break;
            }
            case this.TYPE[5]:
            {
                frame = this.TFireBottle.getSpriteFrame("FBottle01");
                break;
            }
            case this.TYPE[6]:
            {
                frame = this.TPin.getSpriteFrame("Pin01");
                break;
            }
            case this.TYPE[7]:
            {
                frame = this.TPlane.getSpriteFrame("Plane01");
                break;
            }
            case this.TYPE[8]:
            {
                frame = this.TRocket.getSpriteFrame("Rocket01");
                break;
            }
            case this.TYPE[9]:
            {
                frame = this.TShit.getSpriteFrame("Shit01");
                break;
            }
            case this.TYPE[10]:
            {
                frame = this.TSnow.getSpriteFrame("Star01");
                break;
            }
            case this.TYPE[11]:
            {
                frame = this.TSun.getSpriteFrame("Sun01");
                break;
            }
            default:break;
        }
        return frame;
    },
    getNameBytype:function(type)
    {
        let frame = null;
        switch (type)
        {
            case this.TYPE[0]:
            {
                frame = "Arrow";
                break;
            }
            case this.TYPE[1]:
            {
                frame = "Ball";
                break;
            }
            case this.TYPE[2]:
            {
                frame = "BStar";
                break;
            }
            case this.TYPE[3]:
            {
                frame = "Bottle";
                break;
            }
            case this.TYPE[4]:
            {
                frame = "Fan";
                break;
            }
            case this.TYPE[5]:
            {
                frame = "FBottle";
                break;
            }
            case this.TYPE[6]:
            {
                frame = "Pin";
                break;
            }
            case this.TYPE[7]:
            {
                frame = "Plane";
                break;
            }
            case this.TYPE[8]:
            {
                frame = "Rocket";
                break;
            }
            case this.TYPE[9]:
            {
                frame = "Shit";
                break;
            }
            case this.TYPE[10]:
            {
                frame = "Star";
                break;
            }
            case this.TYPE[11]:
            {
                frame = "Sun";
                break;
            }
            default:break;
        }
        var name = frame;
        return name;
    },
    getSpriteFrameByName:function(type,name)
    {
        let frame = null;
        switch (type)
        {
            case this.TYPE[0]:
            {
                frame = this.TArrow.getSpriteFrame(name);
                break;
            }
            case this.TYPE[1]:
            {
                frame = this.TBall.getSpriteFrame(name);
                break;
            }
            case this.TYPE[2]:
            {
                frame = this.TBlueStar.getSpriteFrame(name);
                break;
            }
            case this.TYPE[3]:
            {
                frame = this.TBottle.getSpriteFrame(name);
                break;
            }
            case this.TYPE[4]:
            {
                frame = this.TFan.getSpriteFrame(name);
                break;
            }
            case this.TYPE[5]:
            {
                frame = this.TFireBottle.getSpriteFrame(name);
                break;
            }
            case this.TYPE[6]:
            {
                frame = this.TPin.getSpriteFrame(name);
                break;
            }
            case this.TYPE[7]:
            {
                frame = this.TPlane.getSpriteFrame(name);
                break;
            }
            case this.TYPE[8]:
            {
                frame = this.TRocket.getSpriteFrame(name);
                break;
            }
            case this.TYPE[9]:
            {
                frame = this.TShit.getSpriteFrame(name);
                break;
            }
            case this.TYPE[10]:
            {
                frame = this.TSnow.getSpriteFrame(name);
                break;
            }
            case this.TYPE[11]:
            {
                frame = this.TSun.getSpriteFrame(name);
                break;
            }
            default:break;
        }
        return frame;
    },
    getLaunchType:function(type)
    {
        let frame = 0;
        switch (type)
        {
            case this.TYPE[0]:
            {
                frame = this.launchType[0];
                break;
            }
            case this.TYPE[1]:
            {
                frame = this.launchType[1];
                break;
            }
            case this.TYPE[2]:
            {
                frame =  this.launchType[0];
                break;
            }
            case this.TYPE[3]:
            {
                frame =  this.launchType[0];
                break;
            }
            case this.TYPE[4]:
            {
                frame =  this.launchType[0];
                break;
            }
            case this.TYPE[5]:
            {
                frame = this.launchType[1];
                break;
            }
            case this.TYPE[6]:
            {
                frame = this.launchType[0];
                break;
            }
            case this.TYPE[7]:
            {
                frame = this.launchType[2];
                break;
            }
            case this.TYPE[8]:
            {
                frame = this.launchType[0];
                break;
            }
            case this.TYPE[9]:
            {
                frame = this.launchType[0];
                break;
            }
            case this.TYPE[10]:
            {
                frame = this.launchType[0];
                break;
            }
            case this.TYPE[11]:
            {
                frame = this.launchType[3];
                break;
            }
            default:break;
        }
        var type = frame;
        return type;
    },
});
var wepon = wepon || new Wepon(); 
module.exports = wepon;