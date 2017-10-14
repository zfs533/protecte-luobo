/**
 * 1：地图
 * 2：萝卜动画
 * 4：从tiledMap获取物品坐标点，path坐标集和等
 * 5：Object预制及Layout
 * 6：怪物预制，放入map跑起来
 * 7：触摸事件
 * 8：选中Object
 */
var Transition = require("Transition");
var WeponData = require("WeponsData");
var MonsterData = require("MonsterData");
cc.Class(
{
    extends:cc.Component,
    properties:{

    },
    onLoad:function()
    {
        Transition.fadeIn(0.5,this.node);
        this.initProperty();
        this.loadMap();
        this.loadSprietAtlas();
        this.getPath();
        this.getPaoRects();
        this.showPaoRects();
        WeponData.loadWeponSpriteAtlas();
        MonsterData.loadMonsterSpriteAtlas();
    },
    start:function()
    {
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEvent,this);
        this.openCollisionDebug();
    },
    //打开碰撞调试模式,可以看到碰撞器矩形
    openCollisionDebug:function()
    {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },
    loadSprietAtlas:function()
    {
        let self = this;
        cc.loader.loadRes("Themes/Theme1/Items/Object01-hd",cc.SpriteAtlas,function(err,spriteAtlas){
            self.atlas = spriteAtlas;
            self.setObjects();
        });
        cc.loader.loadRes("Themes/Theme1/Items/Monsters01-hd",cc.SpriteAtlas,function(err,spriteAtlas){
            self.atlas02 = spriteAtlas;
        });
        cc.loader.loadRes("Themes/Items/Items02-hd",cc.SpriteAtlas,function(err,spriteAtlas){
            self.atlas03 = spriteAtlas;
            self.setArrow();
        });
    },
    initProperty:function()
    {
        this.atlas = null;
        this.atlas02 = null;
        this.tiledMap = null;
        this.pathGroup = null;
        this.tiledNameArr = [];
        this.pathArr = [];
        this.objectPrefab = null;
        this.objects = [];
        this.monsterPrefab = null;
        this.monsterArr = [];
        this.monsterCount = 0;
        this.zorder = 20;
        this.ZORDER = 20;
        this.arrowCount = 0;
        this.paoRects = [];
        this.selectPrefab = null;
        this.currentSelectedTag = null;
        this.currentWenponBuyPanel = null;
        this.isInstalling = false;
    },
    loadMap:function()
    {
        //map
        this.tiledMap = this.node.getChildByName("bGPath").getComponent(cc.TiledMap);
        //object
        this.pathGroup = this.tiledMap.getObjectGroup("PATH");
        let objects = this.pathGroup.getObjects();
        for(let i = 0; i<objects.length;i++)
        {
            this.tiledNameArr.push(objects[i].getObjectName());
        }
    },
    setObjects:function()
    {
        let arr = this.tiledNameArr;
        let regexp = /\dOb\d/;
        let regexp2=/\d/;
        for(let i=0; i<arr.length;i++)
        {
            let rg = arr[i].match(regexp);
            if(rg)
            {
                let index = Number(arr[i].match(regexp2)[0]);
                this.layoutObjectByIndex(index,arr[i]);
            }
        }
    },
    layoutObjectByIndex:function(index,objName)
    {
        if(!this.objectPrefab)
        {
            cc.loader.loadRes("prefab/object",cc.Prefab,function(err,prefab)
            {
                this.objectPrefab = prefab;
                this.layoutObjects(index,objName,this.objectPrefab);
            }.bind(this));
        }
        else
        {
            this.layoutObjects(index,objName,this.objectPrefab);
        }

    },
    layoutObjects:function(index,objName,prefab)
    {
        let size = cc.winSize;
        let nodee = cc.instantiate(prefab);
        let frameName = "cloud0"+index;
        nodee.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(frameName);
        this.node.addChild(nodee);
        let obj = this.pathGroup.getObject(objName).getNode();
        nodee.setPosition(obj.x-size.width/2+obj.width/2,obj.y-size.height/2-obj.height/2);
        this.objects.push(nodee);
    },
    getPath:function()
    {
        let size = cc.winSize;
        let arrr = this.tiledNameArr;
        let regexp = /PT\d/;
        let regexp2=/\d/;
        let arr = [];
        for(let i=0; i<arrr.length;i++)
        {
            let rg = arrr[i].match(regexp);
            if(rg)
            {
                let index = Number(arrr[i].match(regexp2)[0]);
                let obj = {index:index,name:arrr[i]};
                arr.push(obj);
            }
        }
        arr.sort(function(a,b){return a.index - b.index;});
        let rect = cc.size(80,80);
        for(let i = 0; i<arr.length;i++)
        {
            let obj = this.pathGroup.getObject(arr[i].name).getNode();
            let pos = cc.p(obj.x+rect.width/2-size.width/2,obj.y-rect.height/2-size.height/2+20);
            let speed = 2;
            if(i == 3 || i == 5 || i == 8 || i == 9)
            {
                speed = speed/3;
            }
            this.pathArr.push({pos:pos,spd:speed});
        }
    },
    setMonstersSchedule:function()
    {
        // let scheduler = cc.director.getScheduler();
        // scheduler.schedule(this.setMonsters,this,2.0);
        this.setMonsters();
        this.schedule(this.setMonsters,6);
    },
    setMonsters:function()
    {
        let self = this;
        if(!self.monsterPrefab)
        {
            cc.loader.loadRes("prefab/monster",cc.Prefab,function(err,prefab)
            {
                self.monsterPrefab = prefab;
                self.layoutmonster(prefab);
            });
        }
        else
        {
            this.layoutmonster(self.monsterPrefab);
        }
    },
    layoutmonster:function(prefab)
    {
        let monster = cc.instantiate(prefab);
        monster.parent = this.node;
        monster.setLocalZOrder(this.zorder--);
        monster.index = 0;
        monster.setPosition(this.pathArr[monster.index].pos);
        monster.getComponent("Monster").setData(this.pathArr,this);
        this.monsterArr.push(monster);
        if(this.zorder<10)
        {
            this.zorder = this.ZORDER;
        }
    },
    setArrow:function()
    {
        let arrow = [
            this.node.getChildByName("arrow0"),
            this.node.getChildByName("arrow1"),
            this.node.getChildByName("arrow2"),
        ];
        for(let i=0;i<arrow.length;i++)
        {
            arrow[i].opacity = 0;
        }
        let time = 0.5;
        let fadeIn = cc.fadeIn(time);
        arrow[0].runAction(fadeIn);
        let delay = cc.delayTime(0.2);
        let fadeIn1 = cc.fadeIn(time);
        let sequence = cc.sequence(delay,fadeIn1);
        arrow[1].runAction(sequence);
        let delay1 = cc.delayTime(time);
        let fadeIn2 = cc.fadeIn(time);
        let callfunc = cc.callFunc(function()
        {
            this.arrowCount++;
            if(this.arrowCount>2)
            {
                for(let i=0;i<arrow.length;i++)
                {
                    arrow[i].destroy();
                }
                this.setMonstersSchedule();
                return;
            }
            this.setArrow();
        }.bind(this),this);
        let sequence1 = cc.sequence(delay1,fadeIn2,callfunc);
        arrow[2].runAction(sequence1);
    },
    //获取炮台可放置矩形集和
    getPaoRects:function()
    {
        let nameArr = this.tiledNameArr;
        let regexp = /Obj\d/;
        for(let i = 0;i<nameArr.length;i++)
        {
            let rg = nameArr[i].match(regexp);
            if(rg)
            {
                let obj = this.pathGroup.getObject(nameArr[i]).getNode();
                let rect = cc.rect(obj.x,obj.y-obj.height,obj.width,obj.height);
                this.paoRects.push(rect);
            }
        }
    },
    //展示可以安装炮塔的位置
    showPaoRects:function()
    {
        // for(let i = 0; i < this.paoRects.length; i++)
        // {
        //     cc.loader.loadRes("prefab/select",cc.Prefab,function(err,prefab)
        //     {
        //         this.selectPrefab = prefab;
        //         let rect = cc.size(80,80);
        //         var pos = cc.p(this.paoRects[i].x-cc.winSize.width/2,this.paoRects[i].y-rect.height-cc.winSize.height/2);
        //         let select = cc.instantiate(prefab);
        //         select.getComponent("Select").setParentt(this);
        //         select.parent = this.node;
        //         select.setPosition(pos);
        //     }.bind(this));
        // }
    },
    touchEvent:function(event)
    {
        let pos = event.getLocation();
        this.checkTouchObjects(pos);
        this.checkTouchMonster(pos);
        this.checkSelectedTag();
        if(!this.paoRects){return;}
        for(let i = 0; i < this.paoRects.length;i++)
        {
            let rect = this.paoRects[i];
            if(cc.rectContainsPoint(rect,pos))
            {
                this.addSelectTag(pos);
                return;
            }
        }
        cc.log("无效点击区域");
    },
    checkSelectedTag:function()
    {
        if(this.currentSelectedTag)
        {
            this.currentSelectedTag.getComponent("Select").touchEvent();
        }
        if(this.currentWenponBuyPanel)
        {
            this.currentWenponBuyPanel.getComponent("WenponBuyPanel").destroyPanel(this);
        }
    },
    addSelectTag:function(pos)
    {
        if(this.isInstalling)
        {
            this.isInstalling = false;
            return;
        }
        if(!this.selectPrefab)
        {
            cc.loader.loadRes("prefab/select",cc.Prefab,function(err,prefab)
            {
                this.selectPrefab = prefab;
                this.layoutSelectTag(prefab,pos);
            }.bind(this));
        }
        else
        {
            this.layoutSelectTag(this.selectPrefab,pos);
        }
    },
    layoutSelectTag:function(prefab,pos)
    {
        let rect = cc.size(80,80);
        pos = cc.p(Math.floor(pos.x/rect.width)*rect.width+rect.width/2-cc.winSize.width/2,Math.floor(pos.y/rect.height)*rect.height+rect.height/2-cc.winSize.height/2);
        let select = cc.instantiate(prefab);
        select.getComponent("Select").setParentt(this);
        select.parent = this.node;
        select.setPosition(pos);
        this.currentSelectedTag = select;
        
        this.showWenponBuyPanel(pos,rect.height);
    },
    checkTouchObjects:function(pos)
    {
        let arr = this.objects;
        for(let i = 0; i < arr.length; i++)
        {
            arr[i].getComponent("Object").showOrHidePoint(false);
            let bbox = arr[i].getBoundingBox();
            let box = cc.rect(bbox.x+cc.winSize.width/2,bbox.y+cc.winSize.height/2,bbox.width,bbox.height);
            if(cc.rectContainsPoint(box,pos))
            {
                arr[i].getComponent("Object").showOrHidePoint(true);
                this.updateInstallState(false);
            }
        }
    },
    checkTouchMonster:function(pos)
    {
        let arr = this.monsterArr;
        for(var i = 0;i<arr.length;i++)
        {
            arr[i].getComponent("Monster").showOrHidePoint(false);
            let bbox = arr[i].getBoundingBox();
            let box = cc.rect(bbox.x+cc.winSize.width/2,bbox.y+cc.winSize.height/2,bbox.width,bbox.height);
            if(cc.rectContainsPoint(box,pos))
            {
                arr[i].getComponent("Monster").showOrHidePoint(true);
                this.updateInstallState(false);
            }
        }
    },
    removeMonsterFromArray:function(monster,monsterCount)
    {
        let count = monsterCount != null ? monsterCount : monster.getComponent("Monster").monsterCount;
        for(let i = 0; i<this.monsterArr.length;i++)
        {
            let ms = this.monsterArr[i];
            let ct = ms.getComponent("Monster").monsterCount;
            if(ct == count)
            {
                this.monsterArr.splice(i,1);
                break;
            }
        }
    },
    showWenponBuyPanel:function(pos,offsetY)
    {
        cc.loader.loadRes("prefab/wepon/wenponBuyPanel",cc.Prefab,function(err,prefab)
        {
            let panel = cc.instantiate(prefab);
            this.node.addChild(panel,this.ZORDER+1);
            panel.getComponent("WenponBuyPanel").setParentt(this);
            panel.setPosition(pos.x,pos.y+offsetY);
            this.currentWenponBuyPanel = panel;
        }.bind(this));
    },
    updateInstallState:function(install)
    {
        this.isInstalling = install;
    }
});