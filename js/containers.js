
/**
 * CONTAINERS
 */


Class('Container',{
    extend:Component,
    children:[],
    add:function(child) {
        this.children.push(child);
    }
});


Class('Panel',{
    extend:Container,
    paint:function() {
        var dom = $("<div>");
        for(var i in this.children) {
            dom.append(this.children[i].paint());
        }
        return dom;
    }
});
Class('RootPanel',{
    extend:Panel,
    rootDom:null,
    initialize:function(dom) {
        if (!dom)
            throw new "Invalid argument";
        this.rootDom = $(dom);
    },
    paint:function() {
        var dom = this._super();
        this.rootDom.append(dom);
        return dom;
    }
});
