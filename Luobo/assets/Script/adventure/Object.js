cc.Class(
{
    extends:cc.Component,
    properties:{

    },
    onLoad:function()
    {

    },
    start:function()
    {
        this.showOrHideBlood(false);
    },
    showOrHideBlood:function(bool)
    {
        this.node.getChildByName("blood").opacity = bool ? 255 : 0;
        if(bool)
        {
            this.scheduleOnce(function()
            {
                this.node.getChildByName("blood").opacity = 0;
            }.bind(this),5);
        }
    }
});