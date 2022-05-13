// 压缩图片
export function handleCompressImg (file) {
  let Orientation
  if (/^image/.test(file.type)) {
    return new Promise((resolve, reject) => {
      // 创建一个reader
      const reader = new FileReader()
      // 将图片转成 base64 格式
      reader.readAsDataURL(file)
      // 读取成功后的回调
      reader.onloadend = function (e) {
        const img = new Image()
        const result = e.target.result
        img.src = result
        // 判断图片是否大于200K,是就压缩图片，反之直接上传
        if (result.length <= (200 * 1024)) {
          console.log('图片小于100k') // 不对图片进行压缩操作
          return resolve(file)
        } else {
          img.onload = function () {
            return resolve(dataURLtoFile(compress(img, Orientation), file.name))
          }
        }
      }
    })
  }
}

function compress (img, Orientation) {
  // 压缩操作
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // 瓦片canvas
  const tCanvas = document.createElement('canvas')
  const tctx = tCanvas.getContext('2d')
  const initSize = img.src.length
  let width = img.width
  let height = img.height
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio
  if ((ratio = width * height / 4000000) > 1) {
    console.log('大于400万像素')
    ratio = Math.sqrt(ratio)
    width /= ratio
    height /= ratio
  } else {
    ratio = 1
  }
  canvas.width = width
  canvas.height = height
  //        铺底色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // 如果图片像素大于100万则使用瓦片绘制
  let count
  if ((count = width * height / 1000000) > 1) {
    console.log('超过100W像素')
    count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    const nw = ~~(width / count)
    const nh = ~~(height / count)
    tCanvas.width = nw
    tCanvas.height = nh
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  }
  // 修复ios上传图片的时候 被旋转的问题
  if (Orientation !== '' && Orientation !== 1) {
    switch (Orientation) {
      case 6:// 需要顺时针（向左）90度旋转
        this.rotateImg(img, 'left', canvas)
        break
      case 8:// 需要逆时针（向右）90度旋转
        this.rotateImg(img, 'right', canvas)
        break
      case 3:// 需要180度旋转
        this.rotateImg(img, 'right', canvas)// 转两次
        this.rotateImg(img, 'right', canvas)
        break
    }
  }
  // 进行最小压缩
  const ndata = canvas.toDataURL('image/jpeg', 0.5)
  console.log('压缩前：' + initSize)
  console.log('压缩后：' + ndata.length)
  console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
  return ndata
}

// base64转化成文件对象格式
function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 转换成file对象
  return new File([u8arr], filename, { type: mime })
}
