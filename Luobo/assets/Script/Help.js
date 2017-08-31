var Transition = require("Transition");
cc.Class({
    extends: cc.Component,

    properties: {
        // atlas01:{
        //     default:null,
        //     type:cc.SpriteAtlas,
        //     displayname:"图集"
        // }
        tower_help:cc.Prefab,
    },
    onLoad: function () {
        Transition.fadeIn(0.5,this.node);
        this.loadSprietAtlas();
        this.initProperty();
        this.handleButton();
        this.setPageviewEvent();
    }, 
    loadSprietAtlas:function()
    {
        let self = this;
        cc.loader.loadRes("Themes/scene/help_1-hd", cc.SpriteAtlas, function (err, spriteAtlas) {
            self.atlas01 = spriteAtlas;
            self.resetTitleButtonTexture(0);
        });
        cc.loader.loadRes("Themes/scene/help_3-hd", cc.SpriteAtlas, function (err, spriteAtlas03) {
            self.atlas03 = spriteAtlas03;
            self.handlePageview(0);
        });
        cc.loader.loadRes("Themes/scene/help_2-hd", cc.SpriteAtlas, function (err, spriteAtlas02) {
            self.atlas02 = spriteAtlas02;
        });
    },
    initProperty:function()
    {
        this.btnArr = [
            {btn:this.node.getChildByName("tips_normal_CN"),normal:"tips_normal_CN",selected:"tips_selected_CN",typee:0},
            {btn:this.node.getChildByName("monster_normal_CN"),normal:"monster_normal_CN",selected:"monster_selected_CN",typee:1},
            {btn:this.node.getChildByName("tower_normal_CN"),normal:"tower_normal_CN",selected:"tower_selected_CN",typee:2},
        ]
        this.pageview = this.node.getChildByName("helpPageview");
    },
    handleButton:function()
    {
        this.node.getChildByName("help_home_normal").on(cc.Node.EventType.TOUCH_END,this.backHomeEvent,this);
        for(let i = 0;i<this.btnArr.length;i++)
        {
            let btn = this.btnArr[i].btn;
            btn.typee = this.btnArr[i].typee;
            btn.on(cc.Node.EventType.TOUCH_END,this.handleTitleButtonEvent,this);
        }
    },
    backHomeEvent:function(event)
    {
        Transition.fadeOutLoadScene(0.5,this.node,"welcome");
    },
    handleTitleButtonEvent:function(event)
    {
        let type = event.currentTarget.typee;
        this.resetTitleButtonTexture(type);
    },
    setPageviewEvent:function()
    {
        let pageview = this.pageview.getComponent(cc.PageView);
        let pageViewEventHandler = new cc.Component.EventHandler();
        pageViewEventHandler.target = this.node;//当前节点
        pageViewEventHandler.component = "Help";//当前JS文件名
        pageViewEventHandler.handler = "pageviewCallback";//回调函数
        pageViewEventHandler.customEventData = "foobar";//自定义数据 
        pageview.pageEvents.push(pageViewEventHandler);//注册
    },
    resetTitleButtonTexture:function(type)
    {
        for(let i = 0; i<this.btnArr.length;i++)
        {
            let btn = this.btnArr[i].btn;
            if(type == i)
            {
                btn.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame(this.btnArr[i].selected);
                btn.getComponent(cc.Button).normalSprite = this.atlas01.getSpriteFrame(this.btnArr[i].selected);
            }
            else
            {
                btn.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame(this.btnArr[i].normal);
                btn.getComponent(cc.Button).normalSprite = this.atlas01.getSpriteFrame(this.btnArr[i].normal);
            }
        }
        let help_monster = this.node.getChildByName("help_monster");
        switch(type)
        {
            case 0:
            {
                this.pageview.active = true;
                help_monster.active = false;
                this.handlePageview(type);
                break;
            }
            case 1:
            {
                help_monster.active = true;
                this.pageview.active = false;
                break;
            }
            case 2:
            {
                this.pageview.active = true;
                help_monster.active = false;
                this.handlePageview(type);
                break;
            }
            default:break;
        }
    },
    handlePageview:function(type)
    {
        if(!this.atlas03 || !this.atlas01)
        {
            return;
        }
        let pageview = this.pageview.getComponent(cc.PageView);
        pageview.removeAllPages();
        if(type == 0)
        {
            this.pageview.setContentSize(cc.size(846,350));
            this.pageview.getChildByName("view").setContentSize(cc.size(846,350));
            for(let i = 0;i<4;i++)
            {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.getComponent(cc.Sprite).spriteFrame = this.atlas03.getSpriteFrame("tips_"+(i+1));
                let childNode = new cc.Node();
                childNode.addComponent(cc.Sprite);
                childNode.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame("tips_text_"+(i+1)+"_CN");
                childNode.parent = node;
                childNode.y = -160;
                pageview.addPage(node);
            }
        }
        else
        {
            this.pageview.setContentSize(cc.size(330,470));
            this.pageview.getChildByName("view").setContentSize(cc.size(330,470));
            for(let i = 0;i < 14; i++)
            {
                let node = cc.instantiate(this.tower_help);
                if(i+1<10)
                {
                    node.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame("tower_0"+(i+1));
                    node.getChildByName("tower_txt").getComponent(cc.Sprite).spriteFrame = this.atlas02.getSpriteFrame("tower_0"+(i+1)+"_CN");
                }
                else
                {
                    node.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame("tower_"+(i+1));
                    node.getChildByName("tower_txt").getComponent(cc.Sprite).spriteFrame = this.atlas02.getSpriteFrame("tower_"+(i+1)+"_CN");
                }
                if((i+1)==14)
                {
                    node.getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame("tower_locked");
                    node.getChildByName("tower_txt").getComponent(cc.Sprite).spriteFrame = this.atlas02.getSpriteFrame("tower_locked_CN");
                }
                pageview.addPage(node);
            }
        }
    },
    pageviewCallback:function(pageview,eventType,customEventData)
    {
        pageview.getComponent(cc.PageView);
        cc.log(pageview.getCurrentPageIndex()+"/"+pageview.getPages().length);
    }
});
