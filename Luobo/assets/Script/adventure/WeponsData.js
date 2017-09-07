var Wepon = cc.Class(
{
    ctor:function()
    {
        this.initProperty();
        this.loadWeponSpriteAtlas();
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
    }
});
var wepon = wepon || new Wepon(); 
module.exports = wepon;