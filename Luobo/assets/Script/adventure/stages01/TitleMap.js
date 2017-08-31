var Transition = require("Transition");
cc.Class(
{
    extends:cc.Component,
    properties:{

    },
    onLoad:function()
    {
        this.initProperty();
        this.loadMap();
        this.loadSprietAtlas();
        this.getPath();
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
            self.setMonstersSchedule();
        });
    },
    initProperty:function()
    {
        this.speed = 2;
        this.atlas = null;
        this.atlas02 = null;
        this.tiledMap = null;
        this.pathGroup = null;
        this.tiledNameArr = [];
        this.pathArr = [];
        this.monsterPrefab = null;
        this.monsterIndex = 0;
        this.zorder = 1000000;
    },
    loadMap:function()
    {
        //map
        this.tiledMap = this.node.getChildByName("BGPath").getComponent(cc.TiledMap);
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
        let size = cc.winSize;
        let node = new cc.Node();
        node.addComponent(cc.Sprite);
        let frameName = "cloud0"+index;
        node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(frameName);//这里还要加上血条
        this.node.addChild(node);
        let obj = this.pathGroup.getObject(objName).getNode();
        node.setPosition(obj.x-size.width/2+obj.width/2,obj.y-size.height/2-obj.height/2+20);
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
        this.schedule(this.setMonsters,0.8);
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
        let animation = monster.getComponent(cc.Animation);
        let clips = animation.getClips();
        animation.play(clips[this.monsterIndex].name);
        
        // this.monsterIndex++;
        if(this.monsterIndex>=clips.length)
        {
            this.monsterIndex = 0;
        }
        monster.index = 0;
        monster.setPosition(this.pathArr[monster.index].pos);
        this.monsterMove(monster);
    },
    monsterMove:function(node)
    {
        node.index++
        if(node.index>=this.pathArr.length)
        {
            node.destroy();
            return;
        }
        let self = this;
        let moveTo = cc.moveTo(this.pathArr[node.index].spd,this.pathArr[node.index].pos);
        let callback = cc.callFunc(function()
        {
            this.monsterMove(node);
        }.bind(this),this);
        let sequence = cc.sequence(moveTo,callback);
        node.runAction(sequence);
    }
});