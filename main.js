window.simulateRandomGesture = function (callback) {

    var target = document.querySelector('body');

    var rect = target.getBoundingClientRect();

    //oldPostion is the first mouse point of c# 
    var oldPostion = {x:1200,y:1200};
    //MouseEvent simulate
    var simulateMouseEvent = function simulateMouseEvent(type, point) {
        var event = new MouseEvent(type, {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': oldPostion.x + point.x,
            'clientY': oldPostion.y + point.y,
            // you can pass any other needed properties here
        });
        target.dispatchEvent(event);
    };


    //keyevent simulate
    var simulateKeyEventDwon = function simulateKeyEventdown(enter_string){
          var e = new Event("keydown");
            e.key=enter_string;    // just enter the char you want to send 
            e.keyCode=e.key.charCodeAt(0);
            e.which=e.keyCode;
            e.altKey=false;
            e.ctrlKey=true;
            e.shiftKey=false;
            e.metaKey=false;
            e.bubbles=true;
          document.dispatchEvent(e);
    }

    var simulateKeyEventUp = function simulateKeyEventup(enter_string){
          var e = new Event("keyup");
            e.key=enter_string;    // just enter the char you want to send 
            e.keyCode=e.key.charCodeAt(0);
            e.which=e.keyCode;
            e.altKey=false;
            e.ctrlKey=true;
            e.shiftKey=false;
            e.metaKey=false;
            e.bubbles=true;
          document.dispatchEvent(e);
    }

    //addTocart(size) id = "size",options = size 

    function addTocart(size){

      var size_combobox = document.getElementById('size');
      
      var target_sizex = size_combobox.offsetLeft;
      var target_sizey = size_combobox.offsetTop;

      var target_position = {x:target_sizex, y:target_sizey};

      generate(oldPostion,target_position);

      mousedown_auto(size_combobox);

      var target = selectbox(document.getElementById('size').options,size);
      var target_select = document.getElementById('size').options[target];
      target_position = {x: target_select.offsetLeft,y:target_select.offsetTop};
      
      generate(oldPostion,target_position);
      mousedown_auto(target_select);

      target_select = document.getElementsByClassName('button')[0];
      target_position = {x: target_select.offsetLeft,y:target_select.offsetTop};
      generate(oldPostion,target_position);
      mousedown_auto(target_select);
    }

    //fielddata is input data, fieldname is name of tag.

    function fillcheckoutfomrfield(fielddata,fieldname){
      var select = document.getElementsByName(fieldname)[0];
      if (select.tagName == "INPUT"){
        var target_position = {x: select.offsetLeft,y:select.offsetTop};
        
        generate(oldPostion,target_position);

        mousedown_auto(target_select);
        auto_type(fielddata,select);
      }
      if (select.tagName == "SELECT"){

        var target = selectbox(select.options,fielddata);
        var target_select = select.options[target];
        target_position = {x: target_select.offsetLeft,y:target_select.offsetTop};
        
        generate(oldPostion,target_position);
        mousedown_auto(target_select);
      }

    }

    //checkout is final checkout.

    function checkout(){
      var target_select = document.getElementsByClassName('checkout')[0];
      var target_position = {x: target_select.offsetLeft,y:target_select.offsetTop};
      generate(oldPostion,target_position);
      mousedown_auto(target_select);
    }

    // generate make the position and simulate the mousemove

    function generate(oldtemp,newtemp){
      var divid_num = 5;
      var insert=[];
      for(var i=0;i<divid_num;i++){
        var xx = Math.random()*(newtemp.x-oldtemp.x)*(i+1)/divid_num + oldtemp.x;
        var yy = Math.random()*(newtemp.y-oldtemp.y)*(i+1)/divid_num + oldtemp.y;
        
        insert.push({
          x:xx,
          y:yy
        });
      }
      insert.push({
        x:newtemp.x,
        y:newtemp.y
      });
      var tt = 0;
      var move = function move(){
        tt++;
        if (tt>divid_num) {
          tt =0;
          return;
      }else {
          simulateMouseEvent('mousemove',insert[tt]);
          setTimeout(move,10);
        }
      }
      move();
      oldPostion = newtemp;
    }

    //mousedown_auto is the mousedown simulate.

    function mousedown_auto(element) {
      var event;
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('mousedown', true, true, window);
      element.dispatchEvent(event);
    };

    //select find target.
    function selectbox(value,selectnum){
      
      for(var i=0;i<value.length;i++)
      {
        if (value[i]==selectnum){
          return i;
        }
      }
      return 0;
    }

    //auto_type is auto input text.
    function auto_type(data,name){
      var demo_input = name;

      var type_this = data;
      var index = 0;

      window.next_letter = function() {
          if (index <= type_this.length) {
              simulateKeyEventdown(type_this.substr(index,1));
              demo_input.value += type_this.substr(index++, 1);
              simulateKeyEventUp(type_this.substr(index-1,1));
              setTimeout("next_letter()", 200 * Math.random());
          }
      }

      next_letter();
    }


};

window.simulateRandomGesturesPeriodically = function (delayBetweenGestures) {
    delayBetweenGestures = delayBetweenGestures !== undefined ? delayBetweenGestures : 50;

    var waitThenGo = function waitThenGo() {
        periodicGesturesTimeoutID = setTimeout(function () {
            window.simulateRandomGesture(waitThenGo);
        }, delayBetweenGestures);
    };
    window.simulateRandomGesture(waitThenGo);
};


window.stopSimulatingGestures = function () {
    clearTimeout(gestureTimeoutID);
    clearTimeout(periodicGesturesTimeoutID);
};
