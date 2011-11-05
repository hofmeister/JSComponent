var Assert = {
    isTrue:function(msg,val) {
        this.equal(msg, true, val);
    },
    isFalse:function(msg,val) {
        this.equal(msg, true, val);
    },
    equal:function(msg,expected,value) {
        this._match(msg,expected == value);    
    },
    notEqual:function(msg,expected,value) {
        this._match(msg,expected != value);    
    },
    _match:function(msg,expr) {
        if (!expr)
            throw msg+" failed";
        else
            console.log(msg+ " succeeded");
    }
}