var WeponData = require("WeponsData");
cc.Class(
{
    extends:cc.Component,
    properties:{},
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
        this.showWeponByType(3);
    },
    showWeponByType:function(type)
    {
        let frame = null;
        switch (type)
        {
            case WeponData.TYPE[0]:
            {
                break;
            }
            case WeponData.TYPE[1]:
            {
                break;
            }
            case WeponData.TYPE[2]:
            {
                break;
            }
            case WeponData.TYPE[3]:
            {
                frame = WeponData.TBottle.getSpriteFrame("Bottle01");
                break;
            }
            case WeponData.TYPE[4]:
            {
                break;
            }
            case WeponData.TYPE[5]:
            {
                break;
            }
            case WeponData.TYPE[6]:
            {
                break;
            }
            case WeponData.TYPE[7]:
            {
                break;
            }
            case WeponData.TYPE[8]:
            {
                break;
            }
            case WeponData.TYPE[9]:
            {
                break;
            }
            case WeponData.TYPE[10]:
            {
                break;
            }
            case WeponData.TYPE[11]:
            {
                break;
            }
            default:break;
        }
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