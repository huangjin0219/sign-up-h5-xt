;(function () {
  if (typeof window.WeixinJSBridge === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
    handleFontSize()
  } else {
    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
    // 重写设置网页字体大小的事件
    window.WeixinJSBridge.on('menu:setfont', function () {
      window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
    })
  }
})()
