var MonsterData = cc.Class(
{
    ctor:function()
    {
        this.initProperty();
    },
    initProperty:function()
    {
        this.theme1_atlas01 = null;
        this.theme1_atlas_oldboss = null;
    },
    //enter use the function
    loadMonsterSpriteAtlas:function()
    {
        cc.loader.loadRes("Themes/Theme1/Items/Monsters01-hd",cc.SpriteAtlas,function(err,atlas){
            this.theme1_atlas01 = atlas;
        }.bind(this));
        cc.loader.loadRes("Themes/Theme1/Items/Monsters02-hd",cc.SpriteAtlas,(err,spriteAtlas) => {
            this.theme1_atlas_oldboss = spriteAtlas;
        });
    },
    getMonsterFramesByIndex:function(index)
    {
        let frame01 = null;
        let frame02 = null;
        let frames  = [];
        switch (index)
        {
            case 0:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fat_green01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fat_green02");
                break;
            }
            case 1:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fly_blue01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fly_blue02");
                break;
            }
            case 2:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fly_yellow01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fly_yellow02");
                break;
            }
            case 3:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_nima01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_nima02");
                break;
            }
            case 4:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_pink01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_pink02");
                break;
            }
            case 5:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_star01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_star02");
                break;
            }
            case 6:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fat_boss_green01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fat_boss_green02");
                break;
            }
            case 7:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fly_boss_blue01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fly_boss_blue02");
                break;
            }
            case 8:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("fly_boss_yellow01");
                frame02 = this.theme1_atlas01.getSpriteFrame("fly_boss_yellow02");
                break;
            }
            case 9:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_boss_nima01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_boss_nima02");
                break;
            }
            case 10:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_boss_pink01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_boss_pink02");
                break;
            }
            case 11:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("land_boss_star01");
                frame02 = this.theme1_atlas01.getSpriteFrame("land_boss_star02");
                break;
            }
            case 12:
            {
                frame01 = this.theme1_atlas01.getSpriteFrame("boss_big01");
                frame02 = this.theme1_atlas01.getSpriteFrame("boss_big02");
                break;
            }
            default:break;
        }
        if(frame01 && frame02)
        {
            frames = [frame01,frame02];
        }
        else 
        {
            cc.log("frame01=> "+frame01);
            cc.log("frame02=> "+frame02);
        }
        return frames;
    }
});
var monsterData = monsterData || new MonsterData();
module.exports = monsterData;