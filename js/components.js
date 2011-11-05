Class('Component',{
    extend:EventEmitter,
    validated:false,
    parent:null,
    dom:null,
    domContainer:null,
    paint:function() {
        throw "Missing paint method for "+this._type;
    },
    invalidate:function() {
        this.validated = false;
        if (this.parent != null) {
            this.validate();
        } else {
            this.validate();
        }
    },
    validate:function() {
        if (this.validated) 
            return;
        
        this.dom = this.paint();
        this.validated = true;
    },
    render:function(domContainer) {
        this.validate();
        domContainer.adopt(this.dom);
    }
});

Class('TextComponent',{
    extend:Component,
    text:"",
    initialize:function(text) {
        this.text = text;
    },
    setText:function(text) {
        this.text = text;
    },
    getText:function() {
        return this.text;
    }
});

Class('Button',{
    extend:TextComponent,
    paint:function() {
        return $("<button>"+this.text+"</button>");
    }
});

Class('InputElement',{
    extend:TextComponent,
    type:null,
    initialize:function(type,text) {
        this._super(text)
        this.type = type;
    },
    paint:function() {
        return $("<input type='"+this.type+"' value='"+this.text+"' />");
    }
});
