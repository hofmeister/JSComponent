
Function.prototype.attach = function(scope) {
	var _function = this;

	return function() {
		return _function.apply(scope, arguments);
	}
}

var isset = function(obj) {
    return !(typeof obj=='undefined' || obj==null);
};
var log = function(msg) {
    if (isset(console))
        console.log(msg);
};

var clone = function(obj) {
    var c = {};
    for(var i in obj) {
        if ($.type(obj[i]) == 'object') {
            c[i] = clone(obj[i]);
        } else if ($.type(obj[i]) == 'array') {
            c[i] = [];
            for(var x = 0; x < obj[i].length;x++) {
                c[i][x] = clone(obj[i][x]);
            }
        } else {
            c[i] = obj[i];
        }
    }
    return c;
};
var Class = function(name,def) {
    
    var methods = {};
    var attrs = {};
    var val,member;
    for(member in def) {
        if (member == 'extend') 
            continue;
        val = def[member];
        if ($.type(val) == 'function') {
            methods[member] = val;
        } else {
            attrs[member] = val;
        }
    }

    var baseClz = def.extend
    
    if (isset(baseClz)) {
        for(member in baseClz.prototype) {
            
            val = baseClz.prototype[member];
            
            if ($.type(val) == 'function') {
                if (methods[member]) {
                    var fun = methods[member];
                    var methodName = member;
                    methods[member] = function() {
                        var m = this._parentMethod(methodName);
                        if (!m)
                            m = function(){};
                        this._super = m.attach(this);
                        var out = fun.apply(this,arguments);
                        delete this._super;
                        return out;
                    }
                } else {
                    methods[member] = val;
                }
                
            }
        }
    }
    
    var clz = function() {
        var parent = baseClz;
        var cstr = methods['initialize'];
        if (cstr == null)
            cstr = function() {};
        
        while(parent) {
            $.extend(this,clone(parent.prototype._attrs));
            parent = parent.prototype._extend;
        }
        
        $.extend(this,clone(attrs));
        cstr.apply(this,arguments);
    };
    clz.prototype = methods;
    clz.prototype.instanceOf = function(type) {
        var obj = this;
        while(obj) {
            if (obj._type == type.prototype._type)
                return true;

            if (!obj._extend) 
                break;

            obj = obj._extend.prototype;
        }
        return false;
    };
    clz.prototype._parentMethod = function(method) {
        if (!this._extend) 
            return null;
        var obj = this._extend.prototype;
        
        while(obj) {
            if ($.type(obj[method]) == 'function') {
                console.log(obj._type + ":"+method);
                return obj[method];
            }

            if (!obj._extend) 
                break;

            obj = obj._extend.prototype;
        }
        return null;
    };
    clz.prototype._attrs = attrs;
    clz.prototype._extend = baseClz;
    
    clz.prototype._type = name;
    window[name] = clz;
    return clz;
};
Class('Event',{
    target:null,
    stopped:false,
    initialize:function(target) {
        this.target = target;
    },
    stop:function() {
        this.stopped = true;
    }
});

Class('EventEmitter',{
    _events:{},
    bind:function(event,fn) {
        if (!isset(this._events[event]))
            this._events[event] = [];
        this._events[event].push(fn);
    },
    trigger:function(event,parms) {
        if (!isset(this._events[event])) return;
        var evt = new Event(this);
        for(var i = 0;i < this._events[event].length;i++) {
            this._events[event][i].apply(this,[evt,parms]);
            if (evt.stopped)
                break;
        }
    }
});