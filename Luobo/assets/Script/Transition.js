var Transition = cc.Class({
    ctor:function()
    {

    },
    fadeIn(time,node)
    {
        node.opacity = 0;
        let fadeIn = cc.fadeIn(time);
        node.runAction(fadeIn);
    },
    fadeOutLoadScene:function(time,node,sceneName)
    {
        time = time || 0.5;
        let fadeOut = cc.fadeOut(time);
        let callfunc= cc.callFunc(function()
        {
            cc.director.loadScene(sceneName);
        });
        let sequence = cc.sequence(fadeOut,callfunc);
        node.runAction(sequence);
    }
});
var transition = transition || new Transition();
module.exports = transition;