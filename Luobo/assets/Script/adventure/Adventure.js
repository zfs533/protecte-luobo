var Transition = require("Transition");
require("LockedNotice");
cc.Class({
    extends:cc.Component,
    properties:{
        backBtn:cc.Button,
        helpBtn:cc.Button,
        leftBtn:cc.Button,
        rightBtn:cc.Button,
        stagesNode:cc.Node,
        stagePageview:cc.PageView,
        backBtn01:cc.Button,
    },
    controlVisible(bool)
    {
        this.backBtn.node.active = bool;
        this.leftBtn.node.active = bool;
        this.rightBtn.node.active= bool;
        this.pageview.active= bool; 
        this.stagesNode.active = !bool;
    },
    onLoad:function()
    {
        Transition.fadeIn(0.5,this.node);
        this.initProperty();
        this.loadSpriteAtlas();
        this.handleButton();
        this.controlVisible(true);
    },
    loadSpriteAtlas:function()
    {
        let self = this;
        cc.loader.loadRes("Themes/scene/themescene1-hd",cc.SpriteAtlas,function(err,spriteAtlas01){
            self.atlas01 = spriteAtlas01;
            self.handlePageview();
        });
        cc.loader.loadRes("Themes/scene/themescene2-hd",cc.SpriteAtlas,function(err,spriteAtlas02){
            self.atlas02 = spriteAtlas02;
            self.handlePageview();
        });
        cc.loader.loadRes("Themes/scene/stages_theme1-hd",cc.SpriteAtlas,function(err,spriteAtlas01){
            self.stages01 = spriteAtlas01;
        });
        cc.loader.loadRes("Themes/scene/stages_bg-hd",cc.SpriteAtlas,function(err,spriteAtlas02){
            self.stages02 = spriteAtlas02;
        });
        
    },
    initProperty:function()
    {
        this.pageview = this.node.getChildByName("adventurePageview");
    },
    handleButton:function()
    {
        let self = this; 
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END,function(){Transition.fadeOutLoadScene(0.5,self.node,"welcome");},this);
        this.helpBtn.node.on(cc.Node.EventType.TOUCH_END,function(){Transition.fadeOutLoadScene(0.5,self.node,"help");},this);
        this.leftBtn.node.on(cc.Node.EventType.TOUCH_END,function()
        {
            self.scrollScroll("left"); 
        },this);
        this.rightBtn.node.on(cc.Node.EventType.TOUCH_END,function()
        {
            self.scrollScroll("right");
        },this);
        this.backBtn01.node.on(cc.Node.EventType.TOUCH_END,function()
        {
            self.controlVisible(true);
        },this);
        this.stagesNode.getChildByName("startSp").on(cc.Node.EventType.TOUCH_START,this.startBegin,this);
        this.stagesNode.getChildByName("startSp").on(cc.Node.EventType.TOUCH_END,this.startEvent,this);
    },
    scrollScroll:function(direction)
    {
        let pageview = this.pageview.getComponent(cc.PageView);
        let index = pageview.getCurrentPageIndex();
        if(direction == "left")
        {
            if(index == 0)
            {
                pageview.scrollToPercentHorizontal(1,0);
                pageview.setCurrentPageIndex(2);
            }
            else if(index == 1)
            {
                pageview.scrollToPercentHorizontal(0,0.5);
                pageview.setCurrentPageIndex(0);
            }
            else if(index == 2)
            {
                pageview.scrollToPercentHorizontal(0.5,0.5);
                pageview.setCurrentPageIndex(1);
            }
        }
        else
        {
            if(index == 0)
            {
                pageview.scrollToPercentHorizontal(0.5,0.5);
                pageview.setCurrentPageIndex(1);
            }
            else if(index == 1)
            {
                pageview.scrollToPercentHorizontal(1,0.5);
                pageview.setCurrentPageIndex(2);
            }
            else if(index == 2)
            {
                pageview.scrollToPercentHorizontal(0,0);
                pageview.setCurrentPageIndex(0);
            }
        }
    },
    handlePageview:function()
    {
        if(!this.atlas01 || !this.atlas02){return;}
        let self = this;
        let pageview = this.pageview.getComponent(cc.PageView);
        cc.loader.loadRes("prefab/theme_pack",cc.Prefab,function(err,theme_pack)
        {
            //这里的预制的宽度没有跟pageview的宽度调成一致，在游戏运行的时候会在这一页看到下一页的部分内容，或者当前页被裁减
            //解决办法是将预制的尺寸调成和pageview一样，这里可能需要建立一个空节点来调尺寸
            for(let i = 0; i<3;i++)
            {
                let node = cc.instantiate(theme_pack);
                node.getComponent(cc.Sprite).spriteFrame = self.atlas02.getSpriteFrame("theme_pack0"+(i+1));
                if(i == 0)
                {
                    node.getChildByName("theme_locked").active = false;
                }
                node.getChildByName("theme_pack01_CN").getComponent(cc.Sprite).spriteFrame = self.atlas01.getSpriteFrame("theme_pack0"+(i+1)+"_CN");
                pageview.addPage(node);
                node.typee = i;
                node.on(cc.Node.EventType.TOUCH_END,self.handleItemEvent,self);
            } 
        });
    },
    handleItemEvent:function(event)
    {
        let type = event.currentTarget.typee;
        let self = this;
        switch(type)
        {
            case 0:
            {
                this.controlVisible(false);
                this.handleStagePageview();
                break;
            }
            case 1:
            {
                cc.loader.loadRes("prefab/locked_notice",cc.Prefab,function(err,notice)
                {
                    let node = cc.instantiate(notice);
                    self.node.addChild(node);
                    let script = node.getComponent("LockedNotice");
                    script.refreshContents(type);
                });
                break;
            }
            case 2:
            {
                cc.loader.loadRes("prefab/locked_notice",cc.Prefab,function(err,notice)
                {
                    let node = cc.instantiate(notice);
                    self.node.addChild(node);
                    let script = node.getComponent("LockedNotice");
                    script.refreshContents(type);
                });
                break;
            }
            default:break;
        }
    },
    // setPageviewEvent:function()
    // {
    //     return;
    //     let pageview = this.pageview.getComponent(cc.PageView);
    //     let pageViewEventHandler = new cc.Component.EventHandler();
    //     pageViewEventHandler.target = this.node;//当前节点
    //     pageViewEventHandler.component = "Help";//当前JS文件名
    //     pageViewEventHandler.handler = "pageviewCallback";//回调函数
    //     pageViewEventHandler.customEventData = "foobar";//自定义数据 
    //     pageview.pageEvents.push(pageViewEventHandler);//注册
    // },
    // pageviewCallback:function(pageview,eventType,customEventData)
    // {
    //     pageview.getComponent(cc.PageView);
    //     cc.log(pageview.getCurrentPageIndex()+"/"+pageview.getPages().length);
    // },
    handleStagePageview:function()
    {
        var len = this.stagePageview.getPages().length;
        if(len>0)
        {
            return;
        }
        let self = this;
        let pageview = this.stagePageview
        cc.loader.loadRes("prefab/ssmap",cc.Prefab,function(err,ssmap)
        {
            for(let i = 0; i<12;i++)
            {
                let node = cc.instantiate(ssmap);
                let url = "ss_map0"+(i+1);
                let url01 = "ss_towers_0"+(i+1);
                if(i>=9)
                {
                    url = "ss_map"+(i+1);
                    url01 = "ss_towers_"+(i+1);
                }
                node.getChildByName("ss_map01").getComponent(cc.Sprite).spriteFrame = self.stages01.getSpriteFrame(url);
                node.getChildByName("ss_towers_01").getComponent(cc.Sprite).spriteFrame = self.stages01.getSpriteFrame(url01);
                pageview.addPage(node);
                node.typee = i;
                node.on(cc.Node.EventType.TOUCH_END,self.handleStageEvent,self);
            } 
        });
        this.stagePageview.node.on("page-turning",this.stagePageVEvent,this);
    },
    handleStageEvent:function(event)
    {
        let type = event.currentTarget.typee;
        let self = this;
    },
    stagePageVEvent:function()
    {
        let index = this.stagePageview.getCurrentPageIndex();
        if(index>0)
        {
            this.stagesNode.getChildByName("startSp").getComponent(cc.Sprite).spriteFrame = this.stages02.getSpriteFrame("ss_locked_CN");
        }
        else
        {
            this.stagesNode.getChildByName("startSp").getComponent(cc.Sprite).spriteFrame = this.stages02.getSpriteFrame("ss_play_normal_CN");
        }
    },
    startBegin:function(event)
    {
        let index = this.stagePageview.getCurrentPageIndex();
        if(index>0)
        {
            return;
        }
        this.stagesNode.getChildByName("startSp").getComponent(cc.Sprite).spriteFrame = this.stages02.getSpriteFrame("ss_play_pressed_CN");
    },
    startEvent:function(event)
    {
        let index = this.stagePageview.getCurrentPageIndex();
        if(index>0)
        {
            return;
        }
        this.stagesNode.getChildByName("startSp").getComponent(cc.Sprite).spriteFrame = this.stages02.getSpriteFrame("ss_play_normal_CN");
        Transition.fadeOutLoadScene(0.5,this.node,"stages01");
    }
});