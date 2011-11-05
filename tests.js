Class('A',{
    initialize:function(arg) {
        console.log("arg:" + arg + " from A");
    },
    test:function() {
        console.log("type:" + this._type + " from A");
    },
    test2:function() {
        this._super();
        console.log("type2:" + this._type + " from A");
    }
});
Class('B',{
    extend:A,
    initialize:function(arg) {
        this._super(arg + "through B")
    },
    test:function() {
        this._super();
        console.log("type:" + this._type + " from B");
    },
    test2:function() {
        this._super();
        console.log("type2:" + this._type + " from B");
    }
});
Class('C',{
    extend:B,
    initialize:function(arg) {
        this._super(arg + "through C")
    },
    test:function() {
        this._super();
        console.log("type:" + this._type + " from C");
    },
    test2:function() {
        this._super();
        console.log("type2:" + this._type + " from C");
    }
});
Class('D',{
    extend:C,
    initialize:function(arg) {
        this._super(arg + "through D")
    },
    test:function() {
        this._super();
        console.log("type:" + this._type + " from D");
    },
    test2:function() {
        this._super();
        console.log("type2:" + this._type + " from D");
    }
});
Class('E',{
    extend:C,
    test:function() {
        this._super();
        console.log("type:" + this._type + " from D");
    }
});

var c = new D();
c.test();
c.test2();

Assert.isFalse("D is not descendant of E",c.instanceOf(Component));
Assert.isTrue("D is descendant of A",c.instanceOf(A));