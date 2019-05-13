
/*
 * @desc 设置1rem = 100px
 * @param
 * @return
 * @author xufeiyang
 * @time 2019/1/8
*/
(function (doc, win) {
  var docEl = doc.documentElement;

  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  function fn () {
    var clientWidth = docEl.clientWidth || 320;
    clientWidth = clientWidth > 540 ? 540 : clientWidth;
    var fontSize = clientWidth * 100 / 750;
    docEl.style.fontSize = fontSize + 'px';
  }

  if (doc.addEventListener) {
    win.addEventListener(resizeEvt, fn, false);
    doc.addEventListener('DOMContentLoaded', fn, false);
  }
})(document, window);
