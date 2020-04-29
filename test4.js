class Upload {
  constructor({ el, accept, multiple, onUpload, quality }) {
    this.el = el || ''
    this.accept = accept || 'image/*'
    this.multiple = multiple || false
    this.quality = quality || 1
    this.beforeUpload = (e) => { console.log(e) }
    this.onProgress = (e) => { console.log('progress->', e) }
    this.onLoad = (result) => {
      onUpload(result)
    }
    this.onError = () => { }
    this.init()
  }
  init () {
    // 如果存在节点
    if (this.el) {
      this.el = typeof this.el === 'object' ? this.el : document.querySelector(this.el)
    }
    this.render()
    this.watch()
  }
  // 渲染节点
  render () {
    let fragment = document.createDocumentFragment(),
      file = document.createElement('input');
    console.log(file, 'file')
    file.type = this.accept
    file.setAttribute('type', 'file');
    file.setAttribute('multiple', this.multiple)
    file.setAttribute('accept', this.accept)
    // 安卓非微信浏览器
    // 苹果/安卓(小米手机)手机微信浏览器
    // file.setAttribute('capture', 'camera')
    file.style.display = "none"
    file.className = 'upload__input'
    fragment.appendChild(file)
    this.el.appendChild(fragment)
  }
  watch () {
    let inputEl = this.el.querySelector('.upload__input');
    inputEl.addEventListener('change', () => {
      // 伪数组转为数组
      let files = Array.from(inputEl.files) // 如同时选择几张图片，则该数组.length>1
      // 读取图片
      let readImg = () => {
        // 图片递归殆尽则终止
        if (files.length === 0) return;
        let file = files[0]
        let fileReader = new FileReader()
        fileReader.onloadstart = () => {
          // 如果类型不符合
          if (this.accept !== 'image/*' && !this.accept.includes(file.type.toLowerCase())) {
            fileReader.abort()
            this.beforeUpload(file)
            console.error('文件格式有误-->', file.type.toLowerCase())
          }
        }
        fileReader.onload = async () => {
          let base64 = fileReader.result
          let compressedBase64 = await this.compressBase64(file, base64)
          let blob = this.base64ToBlob(compressedBase64)
          this.onLoad({ blob, base64: compressedBase64 })
          files.shift() // 删除第一个
          // 递归
          readImg()
        }
        fileReader.onprogress = (e) => {
          this.onProgress(e)
        }
        this.isImage(file.type) ? fileReader.readAsDataURL(file) : fileReader.readAsText(file);
      }
      readImg()
    })
  }

  // 压缩base64
  compressBase64 (file, base64) {
    let canvas = document.createElement('canvas')
    let image = document.createElement('img');
    image.src = base64;
    let size = file.size / 1000 / 1024 // b -> MB

    console.log(size, 'MB')
    this.quality = Math.min(2 / size, 1) // 图片大小限制为2MB以内
    console.log(this.quality, 'quality')
    return new Promise(resolve => {
      image.onload = async () => {
        let imageWidth = image.naturalWidth;
        let imageHeight = image.naturalHeight;
        await this.rotateCanvas(file, image, canvas, imageWidth, imageHeight)
        resolve(canvas.toDataURL('image/jpeg', this.quality))
      }
    })
  }

  // 旋转画布,防止ios低版本图片旋转问题
  rotateCanvas (file, image, canvas, imageWidth, imageHeight) {
    let ctx = canvas.getContext('2d');
    let Orientation = 1
    const EXIF = require("exif-js");
    return new Promise(resolve => {
      EXIF.getData(file, function () {
        // 获取图片信息
        Orientation = EXIF.getTag(this, 'Orientation');
        console.log(Orientation, 'orient')
        switch (Orientation * 1) {
          case 6:     // 旋转90度
            canvas.width = imageHeight;
            canvas.height = imageWidth;
            ctx.rotate(Math.PI / 2);
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, -imageHeight, imageWidth, imageHeight);
            break;
          case 3:// 旋转180度
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            ctx.rotate(Math.PI);
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, -imageWidth, -imageHeight, imageWidth, imageHeight);
            break;
          case 8:     // 旋转-90度
            canvas.width = imageHeight;
            canvas.height = imageWidth;
            ctx.rotate(3 * Math.PI / 2);
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, -imageWidth, 0, imageWidth, imageHeight);
            break;
          default:
            // 默认正确的情况下
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
        }
        resolve()
      });
    })
  }
  // 检验是否为图片
  isImage (type) {
    let reg = /(image\/jpeg|image\/jpg|image\/png)/gi
    return reg.test(type)
  }
  // base64 -> blob
  base64ToBlob (base64) {
    let arr = base64.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}

export default Upload

```
<input type="file" @change="handleChange" class="upload__btn" />
```

// 如下调用

new Upload({
  el: document.querySelector('.upload__btn'),
  accept: 'image/*',
  multiple: true,
  quality: 1,
  onUpload ({ blob, base64 }) {
    // base64 用于预览
    // blob 给后台
  }
})

