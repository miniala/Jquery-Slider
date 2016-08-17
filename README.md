# JQuery Slider Plugin

## Use
    $('#slider').madSlider({
      formula: function(i,j){
        var _number = 0
        if(i > j/3*2){
          _number = 10 + Math.ceil((i - j/3*2)/(j/3/10))
        } else {
          _number = Math.ceil(i/(j/3*2/10))
        }
        return _number > 10 ? 10 : _number
      },
      callBack: Callback
    })
    
## Options

    formula: 进度条返回值计算公式，i 当前拖拽长度，j 总长度；
    callBack: 拖拽回调，传入 formula 返回值
