var Transition = require("Transition");
cc.Class({
    extends: cc.Component,

    properties: {
        bird:cc.Node,
        cloud1:cc.Node,
        btnArr:[cc.Button],
    },

    // use this for initialization
    onLoad: function () {
        Transition.fadeIn(0.5,this.node);
        this.setNormalProperty();
        this.handleButton();
    },

    setNormalProperty:function()
    {
        let time = 3;
        let moveBy01 = cc.moveBy(time,0,20);
        let moveBy02 = cc.moveBy(time,0,-20);
        let sequence = cc.sequence(moveBy01,moveBy02);
        this.bird.runAction(sequence.repeatForever());
        let time1 = 6;
        let moveBy03 = cc.moveBy(time1,100,0);
        let moveBy04 = cc.moveBy(time1,-100,0);
        let sequence1 = cc.sequence(moveBy03,moveBy04);
        this.cloud1.runAction(sequence1.repeatForever());
    },

    handleButton:function()
    {
        for(let i = 0;i<this.btnArr.length; i++)
        {
            this.btnArr[i].node.typee = i;
            this.btnArr[i].node.on(cc.Node.EventType.TOUCH_END,this.handleButtonEvent,this);
        }
    },
    handleButtonEvent:function(event)
    {
        let type = event.currentTarget.typee;
        switch(type)
        {
            case 0:
            {
                Transition.fadeOutLoadScene(0.5,this.node,"setting");
                break;
            }
            case 1:
            {
                Transition.fadeOutLoadScene(0.5,this.node,"help");
                break;
            }
            case 2:
            {
                Transition.fadeOutLoadScene(0.5,this.node,"adventure");
                break;
            }
            default:break;
        }
    }
});
