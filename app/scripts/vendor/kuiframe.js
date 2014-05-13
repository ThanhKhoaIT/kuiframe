// Author: Karl Nguyen
// Code: 2014
 
$.fn.kuiframe = function(options) {
  var _t = this;
  var defaults = {
    key: "kuiframe",
    action: "",
    type: "POST",
    enctype: "multipart/form-data"
  };
  
  _t.o = $.extend({}, defaults, options);
  _t.successEvent = false;
   
  _t.update = function(optionsNew) {
    _t.o = $.extend({}, _t.o, optionsNew);
    var rand = Math.floor(Math.random() * (800000000 + 1)) + 100000000;
    $("#"+_t.attr("target")).remove();
  
    var iFrame = $("<iframe>").attr({
      id: _t.o.key + "_" + rand,
      name: _t.o.key + "_" + rand,
      src: "#",
      style: "display:none",
    }).insertAfter(_t);
    _t.attr({
      target: _t.o.key + "_" + rand,
      action: _t.attr('action') || _t.o.action,
      method: _t.attr('method') || _t.o.type,
      enctype: _t.attr('enctype') || _t.o.enctype
    });
    
    if (typeof(_t.o.data) != "undefined") {
      $.each(_t.o.data, function(name, value){
        _t.find("[name=" + name + "]").remove();
        $("<input>").attr({
          name: name,
          value: value,
          type: "hidden"
        }).appendTo(_t);
      });
    }
    // Listener postMessages form iframe
    if ((typeof(_t.o.success) == "function") && (_t.successEvent == false)) {
      _t.successEvent = true;
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      eventer(messageEvent, function(e) {
        if (e.origin == _t.o.domain) {
          _t.o.success(JSON.parse(e.data));
          _t.successEvent = false;
          this.removeEventListener(messageEvent, arguments.callee, false);
        }
      }, false);
    }
  };
  _t.update(_t.o); 
  return _t;
}