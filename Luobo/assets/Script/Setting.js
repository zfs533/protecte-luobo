var Transition = require("Transition");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        Transition.fadeIn(0.5,this.node);
        this.loadSprietAtlas();
        this.initProperty();
        this.handleButton();
    },

    loadSprietAtlas:function()
    {
        let self = this;
        cc.loader.loadRes("Themes/scene/setting01-hd", cc.SpriteAtlas, function (err, spriteAtlas) {
            self.atlas01 = spriteAtlas;
        });
        cc.loader.loadRes("Themes/scene/setting02-hd", cc.SpriteAtlas, function (err, spriteAtlas02) {
            self.atlas02 = spriteAtlas02;
            self.resetTitleButtonTexture(0);
        });
    },
    initProperty:function()
    {
        this.btnArr = [
            {sp:this.node.getChildByName("options_normal_CN"),normal:"options_normal_CN",selected:"options_selected_CN",typee:0},
            {sp:this.node.getChildByName("statistics_normal_CN"),normal:"statistics_normal_CN",selected:"statistics_selected_CN",typee:1},
            {sp:this.node.getChildByName("credits_normal_CN"),normal:"credits_normal_CN",selected:"credits_selected_CN",typee:2},
        ]
    },
    handleButton:function()
    {
        let btnBack = this.node.getChildByName("help_home_normal");
        btnBack.on(cc.Node.EventType.TOUCH_END,this.handleBackEvent,this);
        for(let i=0;i<this.btnArr.length;i++)
        {
            let btn = this.btnArr[i].sp;
            btn.typee = this.btnArr[i].typee;
            btn.on(cc.Node.EventType.TOUCH_END,this.handleTitleEvent,this);
        }
    },
    handleBackEvent:function()
    {
        Transition.fadeOutLoadScene(0.5,this.node,"welcome");
    },
    handleTitleEvent:function(event)
    {
        let type = event.currentTarget.typee;
        this.resetTitleButtonTexture(type);
    },
    resetTitleButtonTexture:function(type)
    {
        for(let i = 0; i<this.btnArr.length;i++)
        {
            let btn = this.btnArr[i].sp;
            if(type == i)
            {
                btn.getComponent(cc.Sprite).spriteFrame = this.atlas02.getSpriteFrame(this.btnArr[i].selected);
            }
            else
            {
                btn.getComponent(cc.Sprite).spriteFrame = this.atlas02.getSpriteFrame(this.btnArr[i].normal);
            }
        }
        let options = this.node.getChildByName("setting_bg");
        let statistic = this.node.getChildByName("statistics_bg");
        let credits = this.node.getChildByName("credits_bg");
        switch(type)
        {
            case 0:
            {
                options.active = true;
                statistic.active = false;
                credits.active = false;
                break;
            }
            case 1:
            {
                options.active = false;
                statistic.active = true;
                credits.active = false;
                break;
            }
            case 2:
            {
                options.active = false;
                statistic.active = false;
                credits.active = true;
                break;
            }
            default:break;
        }
    },
});
