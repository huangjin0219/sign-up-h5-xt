/* eslint-disable no-underscore-dangle */
const XTJsBridge = {
  // 数据存储属性
  bridgeCallbacks: {},
  bridgeCallbackCounters: 0,
  bridgeInjected: false,
  bridgeRegistedMethods: {},
  /// ///////////////////////////////////////////////////////////////////////////////////////
  // h5请求app
  bridgeH5CallNative(methodName, data, callbackFunc) {
    const callbackId = XTJsBridge._bridgeAddCallback(callbackFunc)
    console.log(
      'h5CallNative-------',
      JSON.stringify({
        methodName,
        callbackId,
        data
      })
    )
    const a =
      window.xtapp &&
      window.xtapp.h5CallNative(
        JSON.stringify({
          methodName,
          callbackId,
          data
        })
      )
    // console.log(a)
    return a
  },
  // 处理native请求h5后h5的回调 //1成功 0没找到方法 -1调用失败
  bridgeHandleNativeCallback(callbackId, data, code, msg) {
    const res = JSON.stringify({
      callbackId,
      data,
      code,
      msg
    })
    window.xtapp.handleNativeCallback(res)
  },
  /// ///////////////////////////////////////////////////////////////////////////////////////
  // 向bridge注册方法
  bridgeRegisterMethods(methodName, func) {
    XTJsBridge.bridgeRegistedMethods[methodName] = func
  },
  // 查找bridge中已经注册的方法
  bridgeSearchMethods(methodName) {
    const func = XTJsBridge.bridgeRegistedMethods[methodName]
    if (func) {
      return func
    }
    return undefined
  },
  /// ///////////////////////////////////////////////////////////////////////////////////////
  // 当h5请求app时 自己需要生成一个callbackid及对应的回调函数 通过下面_bridgeFindCallback查找对应回调函数
  _bridgeAddCallback(callbackFunc) {
    const callbackId = XTJsBridge.bridgeCallbackCounters + 1
    XTJsBridge.bridgeCallbacks[callbackId] = callbackFunc
    return callbackId
  },
  _bridgeFindCallback(callbackId) {
    return XTJsBridge.bridgeCallbacks[callbackId]
  },
  _bridgeRemoveCallback(callbackId) {
    delete XTJsBridge.bridgeCallbacks[callbackId]
  },
  /// ///////////////////////////////////////////////////////////////////////////////////////
  // vue-plugin需要实现install方法
  install(Vue) {
    // Vue.prototype.$xtjsbridge = XTJsBridge
    const that = XTJsBridge
    Vue.mixin({
      beforeCreate() {
        // eslint-disable-next-line eqeqeq
        if (window.xtapp && that.bridgeInjected == false) {
          // app请求h5
          window.xtapp.nativeCallH5 = function (msg) {
            if (msg.methodName) {
              const func = that.bridgeSearchMethods([msg.methodName])
              if (func) {
                func(msg.data, (res, success) => {
                  if (success) {
                    that.bridgeHandleNativeCallback(msg.callbackId, res, 1, '调用成功')
                  } else {
                    that.bridgeHandleNativeCallback(msg.callbackId, null, -1, '调用失败')
                  }
                })
              } else {
                that.bridgeHandleNativeCallback(msg.callbackId, '', 0, `${msg.methodName}方法未注册！`)
              }
            } else {
              that.bridgeHandleNativeCallback(msg.callbackId, '', -1, '参数错误，没有传递方法名')
            }
          }
          // 处理h5请求app后app的回调
          window.xtapp.handleH5Callback = function (msg) {
            // alert(JSON.stringify(msg))
            // if (msg.code === 1) {
            const callbackFunc = that._bridgeFindCallback(msg.callbackId)
            if (callbackFunc) {
              callbackFunc(msg)
            }
            // }
            that._bridgeRemoveCallback(msg.callbackId)
          }
          that.bridgeInjected = true
        }
        // console.log('bridge是否生效:', that.bridgeInjected)
      }
    })
  }
}

export default XTJsBridge
