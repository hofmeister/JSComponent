var root = new RootPanel("body");

var btn = new Button("test");
var input = new InputElement("text","hallo...");
root.add(btn);
root.add(input);

root.invalidate();