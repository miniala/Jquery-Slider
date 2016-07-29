/* ========================================================================
 * JQuery Plugin MadSlider.js v0.0.2
 * http://github.com/miniala/MadSlider
 * ======================================================================== */

+function ($) { "use strict";

  // MadSlider CLASS DEFINITION
  // ==========================
  
  var MadSlider = function (element, params) {
    this.$element = $(element);
    this.$body = $('body');
    this.$drager = this.$element.find('> [data-slider="drager"]'); //拖动条
    this.$bar = this.$element.find('> [data-slider="bar"]'); //内容层
    this.position = 0;
    this.minPosition = 0;
    this.maxPosition = this.$element.width();
    this.callBack = params.callBack
    this.formula = params.formula || function(i,j){var _number =  Math.ceil(i/(j/10)); return _number > 10 ? 10 : _number}
    this.isMove = false;
  }

  MadSlider.prototype.init = function(){
    var that = this
    , $that = that.$element
    , pageX = 0
    ;

    that.$drager.on('mousedown touchstart', function(e) {
      e.preventDefault();
      that.isMove = true;
      that.position = parseInt(that.$drager.css('left').replace('px', ''), 10) - e.pageX || e.originalEvent.touches[0].pageX;
    })
    
    that.$body.on('mousemove touchmove', function(e) {
      if(that.isMove == false) return;
      that.slideTo({x: that.position + e.pageX || e.originalEvent.touches[0].pageX, callBack: that.callBack});
    })

    // 解除绑定拖动事件
    that.$body.on('mouseup mouseleave touchend', function(){
      that.isMove = false;
    });
  }
  
  /* @name  sliderTo
   */
  MadSlider.prototype.slideTo = function(o){
    var _x        = o.x // x轴值
    var _callBack = o.callBack
    var _speed    = o.speed || 5
    
    if(_x != undefined){
      if (_x >= this.maxPosition){ //小于或大于重置数值
        _x = this.maxPosition
      } else if(_x <= this.minPosition){
        _x = this.minPosition;
      }
      this.$bar.stop().animate({'width': _x}, _speed);
      this.$drager.stop().animate({'left' : _x}, _speed); //移动节点

      if(_callBack){
        _callBack(this.formula(_x, this.maxPosition))
      }
    }
  }

  function Plugin(params) {
    return this.each(function() {
      var $this = $(this)
      , data = $this.data('mad.slider')
      ;

      params ? params : params = {}
      
      if (!data)$this.data('mad.slider', ( data = new MadSlider(this, params)))
      data.init()
    })
  }
  
  var old = $.fn.madSlider
  
  $.fn.madSlider             = Plugin;
  $.fn.madSlider.constructor = MadSlider;
  
  // MadSlider NO CONFLICT
  // =================

  $.fn.madSlider.noConflict = function () {
    $.fn.madSlider = old
    return this
  }
  
  // MadSlider Via Data Attribute
  // =================
  $('[data-mad="slider"]').madSlider();
  
}(jQuery);
