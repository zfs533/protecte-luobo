cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        cc.loader.loadRes("Themes/scene/thempopuplock-hd",cc.SpriteAtlas,function(err,spriteAtlas01){
            self.atlas01 = spriteAtlas01;
        });
        this.handleBtn();
    },
    handleBtn:function()
    {
        let self = this;
        let knowBtn = this.node.getChildByName("locked_notice_ok_normal");
        knowBtn.on(cc.Node.EventType.TOUCH_END,this.handleKnowEvent,this);
    },
    handleKnowEvent:function()
    {
        this.node.destroy();
    },
    refreshContents:function(type)
    {
        let self = this;
        if(!this.atlas01)
        {
            cc.loader.loadRes("Themes/scene/thempopuplock-hd",cc.SpriteAtlas,function(err,spriteAtlas01){
                self.atlas01 = spriteAtlas01;
                self.node.getChildByName("locked_text_theme2").getComponent(cc.Sprite).spriteFrame = self.atlas01.getSpriteFrame("locked_text_theme"+(type+1));
            });
        }
        else
        {
            this.node.getChildByName("locked_text_theme2").getComponent(cc.Sprite).spriteFrame = this.atlas01.getSpriteFrame("locked_text_theme"+(type+1));
        }
    } 
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
