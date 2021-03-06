---
2018 年 3月9号开始 至 2018 年 5月26日

---
## 工作新知识
### sublime 全局搜索 
sublime 頂部 find >>> Find all Files
### 查看ssh keys密钥命令
`cat ~/.ssh/id_rsa.pub`
### 查看本地分支
`git branch`
### 查看远程分支
`git branch -r`
### 查看远程仓库
`git remote -v`
### 强制合并
`git pull --force`
### refusing to merge unrelated histories
`git pull origin branchname --allow-unrelated-histories`
### git diff
比较暂存区和本地区的区别
### 回滚的几种方式
### fork 多人协作

如果自己fork的远程的仓库，被更新了，那么我自己的仓库，应该如何和自己fork的远程仓库
保持一致。

执行命令

`git remote add octocat https://github.com/octocat/Spoon-Knife.git`

查看远程分支

`git remote -v`

自己在本地修改了，那么可以按照

`git add `
`git commit`

修改好了之后
执行命令
git fetch octocat master:delelop // 注意fetch命令只是将远端的数据拉到本地仓库，并不会自动合并到当前工作分支。只有当你确实准备好了，才能手工合并。而git pull 是从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。执行完fetch之后，因此还要再执行一次git 

`git pull octocat master`

之后执行 `git push origin master`

[try git](https://try.github.io/levels/1/challenges/1)
[参考](https://gist.github.com/suziewong/4378619)

### 拉取远程新分支命令

方法一:  先执行git fetch， 然后查看远程分支 git branch -r，然后执行git checkout v2。即现在的当前本地分支为远程新建的分支。

方法二: git fetch origin 'remote-branch-name':'local-branch-name'; 将远程新分支在本地重新命令一下，之后，git checkout local-branch-name.
[参考](https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch))

方法三: git checkout -b 'branch-name' 'remote-name'/'branch-name' 就是将两步合并起来。

### generator( 生成器 )

写下这个， 是因为我对于 * 号和 yield的一脸懵状。

ES6 标准引入的新的数据类型，一个generator看上去像一个函数，由function*定义(注意多出的*号)， 并且，除了return语句，还可以用yield返回多次。

举列说明 

有个next方法。 多次返回
```
	function* generator(i) {
		yield i;
		yield i + 10;
	}

	var gen = generator(10);

	console.log(gen.next().value);

	console.log(gen.next().value);
```
example with yield*

```
	function* anotherGenerator(i) {
		yield i + 1;
		yield i + 2;
		yield i + 3;
	}

	function* generator(i) {
		yield i;
		yield* anotherGenerator(i);
		yield i + 10;
	}
	
	var gen = generator(10);

	console.log(gen.next().value); // 10
	console.log(gen.next().value); // 11
	console.log(gen.next().value); // 12
	console.log(gen.next().value); // 13
	console.log(gen.next().value); // 20
```
[具体参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

### 三个点的用法

1、用于组装数组
```
const todos = ['Learn dva'];
[...todos, 'Learn antd'];
```

2、也可用于获取数组的部分项
```
const arr = ['a', 'b', 'c'];

const [first, ...rest] = arr;

rest; 
```
with ignore

```
const [first,,...rest] = arr;
rest; 
```
3、还可收集函数参数为数组。
```
function directions(first, ...rest) {
	console.log(rest);
}
directions('a', 'b', 'c');
```
4、 代替 apply.
```
function foo(x, y, z) {}
const args = [1,2,3];

// 下面两句效果相同
foo.apply(null, args);
foo(...args); // 我觉得这样的语句可以常用。  
```
4、对Object而言，用于组合成新的Object。

```
const foo = {
  a: 1,
  b: 2,
};
const bar = {
  b: 3,
  c: 2,
};
const d = 4;

const ret = { ...foo, ...bar, d, };  // { a:1, b:3, c:2, d:4 }
```

### 复制数组不改变原数组的三种方法

1、connect

为了防止 array1 为undefined，最好写成下面这样。

(1) first method
`var array2 = [].concat(array1 || []);`

(2) second method
`var array2 = (array1 || []).concat(); `

2、spreads ... to copy array
`const itemCopy = [...items]`

2、slice

`var newArray = array.slice();`

为了防止 array1 为空，最好的方式是`var array2 = (array1 || []).slice();`

3、filter

举列说明:

```
var array = [2, 4, 5, 7];
var uniqueProducts = array.filter(function(elem, i, array) {
	return array.indexOf(elem) === i;
	}
);

uniqueProducts = [8,9,10,11];

console.log(array);  // [2, 4, 5, 7]
console.log(uniqueProducts); // [8, 9, 10, 11]
```
4、from

`var arr2 = Array.from(arr); // 并不会去重` 

5、an easy way to copy Array and Objects：

`var arr2 = JSON.parse(JSON.stringify(arr));`

6、 直接用for循环

以上全部，参考文档
[参考文档](https://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript)

### react 一种之前没有用过的做法

说神奇是因为 他把数据，放在 map内部进行处理，处理完之后，再使用。
```
{
item.content.map((_val, index) => {
                          const dataItem={
						    	icon: _val.punch>0?'//img.pipacoding.com/assets/homework/clock_lamp_yellow.png':'//img.pipacoding.com/assets/homework/clock_lamp_gray.png',
							  	background:lessonId===_val.id?"#ED6C12":"transparent",
							  	toastText:`第${_val.unitOrder}课${_val.sectionOrder}小节 ${_val.name} ${
							  	_val.punch>0?"已打卡": _val.locked ? "未解锁":_val.homework?'未打卡':'未交作业'}`
							}
                          return (
	                          <div key={index}
	                               style={{background:dataItem.background, borderRadius: '8px', margin: '5px'}} 
	                               onClick={() => this.showToast(dataItem.toastText)}
	                               >
	                               <img className={styles.ImgStyle} src={dataItem.icon} />
	                          </div>
	                        )
                         })
}
```
### css 虚线的实现
```
div {
    padding: 1em;
    border: 1px dashed transparent;
    background: linear-gradient(white,white) padding-box,
    repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em);
}
```
### 圆角矩形
`border-radius: 100px`

### 主分支合并dev分支
第一种方式
```
git checkout master
git merge development
git push -u origin master
```
第二种方式
```
git merge master (on branch development)
(resolve any merge conflicts if there are any)
git checkout master
git merge development (there won't be any conflicts now)
```
### git push
`git push <远程主机名> <本地分支名>:<远程分支名>`

### git pull
`git pull <远程主机名> <远程分支名>:<本地分支名>`
### 判断是否微信端
第一种方式
```
var ua = window.navigator.userAgent.toLowerCase();//获取判断用的对象
			  if (ua.match(/MicroMessenger/i) == "micromessenger") {
			    //在微信中打开
			  } else {
			  	// 不是在微信里面打开
			  }
```
第二张方式  react中使用
安装 `import MobileDetect from 'mobile-detect'`

```
const ua = window.navigator.userAgent;
const md = new MobileDetect(ua);
export const config = {
	md,
}
```
另一个文件使用
```
const isWechat = config.md.match('MicroMessenge');
```
### video.js

https://codepen.io/heff/pen/EarCt


https://codepen.io/zanechua/pen/GozrNe

react html5视频
https://www.npmjs.com/package/react-html5video

### 高度撑不开看不到完整的背景图  如何解决.
背景图撑开盒子高度
代码如下
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>背景图撑开盒子高度</title>
    <style>
        .bg-box {
            background-image: url(../demo.jpg);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin:0 auto;
        }
        .bg-box::after {
            content: "";
            display: block;
            /*这里的padding =  height / width*/
            这里就直接用height/width 就可以
            // padding:20%;
        }
    </style>
</head>
<body>
    <div class="bg-box"></div>
</body>
</html>
```

### react 里面滚动到底部功能
```
import { animateScroll } from 'react-scroll';
```
```
onClick={(e) => {
    	e.preventDefault();
    	animateScroll.scrollToBottom();
    }}
```
### 关于写模态框的一些思考
1. 比较常用的state值的函数
```
父组件
function change(payload) {
    dispatch({ type: 'homework/save', payload });
  }
将该函数传入子组件中
<Element change={change}/>
```
2. mask 蒙层
这个直接就是写成一个组件  代码如下:
```
import React from 'react';
import { Icon } from 'antd-mobile';

import Center from '../../Container/Center';
import styles from './Mask.css';

function Mask(children,func,sty) {
  if(!sty)
  {
    const sty = 'rgba(0,0,0,0.8)';
  }

  function caclHeight() {
    return document.documentElement.clientHeight;
  }
  return (
    <div
      className={styles.mask}
      onClick={func}
      style={{backgroundColor:sty}}
    >
      <Center style={{ height: `caclHeight()px` }}>
         {children()}
      </Center>
    </div>
  );
}
export default Mask;
```
如何使用mask 这个组件,  maskContent 传入一个纯组件，又传入一个关闭的函数。
只要在maskContent里面写上你在蒙层上面想写的内容就可以了。
```
 {Mask(maskContent,close)}
 {Mask(this.maskContent.bind(this), this.close.bind(this))} // 这里等同于上述
```

### 204(No Content)
服务器成功处理了请求，但不需要返回任何实体内容，204响应禁止包含任何消息体。
浏览器收到该响应后不应产生文档视图的变化。

### 抓包
所有的抓包不成功都是因为教程不完整。
首先下载 fiddler
1.配置fiddler允许监听https(fiddler 默认)
这个有空再写吧

### 移动端，点击图片禁止出现预览图片的效果
```
var img=document.getElementById("bg");
img.addEventListener('click',function(e){
   e.preventDefault();
});
```
上述的代码完全是正确的，但是在电脑上在下面加一个console.log，这个log还是会打出来的。
### 合并多个commit
[参考链接](https://blog.csdn.net/itfootball/article/details/44154121)

### 关于异步请求
promise 如何运用resolve 异步 和同步 是什么样的
http://welefen.com/post/how-to-convert-callback-to-promise.html

```
var promisify = function promisify(fn, receiver) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function (resolve, reject) {
      fn.apply(receiver, [].concat(args, [function (err, res) {
        return err ? reject(err) : resolve(res);
      }]));
    });
  };
};
```
进行对比
```
let pingppPromise = promisify(pingpp.createPayment, pingpp);
          pingppPromise(res.data.data.ChargeInfo).then(function(result) {
            if (result == "success") {
              // 在这个里面好像是没有办法调用接口的
              if(resSuccess.errcode === 0) {
                if(resSuccess.data.id) {
                  // let resSuccess = yield call(applySuccess, {pingId: pingId})
                  window.location.href = `${origin}/applySuccess`;
                }
              }
                // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
              } else if (result == "fail") {
                  // Ping++ 对象不正确或者微信公众号 / QQ公众号支付失败时会在此处返回
              } else if (result == "cancel") {
                  // 微信公众号支付取消支付
                  window.location.href = `${origin}/orderForm`;
              }
          }).catch(function(err) {
              console.log(err);
          })
```

```
function abc() { 
  var t = 1; console.log(t);
  function def() {
    console.log(t);
  }
}
```
异步请求
使用异步模式的话，当数据完全请求回来以后，会执行一个指定的回调函数，在执行请求的同时浏览器会正常的执行其他事务的处理。


同步XHR通常会导致网络挂起。但开发人员通常不会注意到这个问题，因为在网络状况不佳或服务器响应速度慢的情况下，挂起只会显示同步XHR现在处于弃用状态。


以上三种情况我都写错了，难道我是在瞎写吗？
每当要放弃的时候，再想一种方法或许就会成功了。

别人好的代码:
```
const pingppRes = yield call(getPingpp,res.data.data.ChargeInfo);
            if (pingppRes == "success") {
              let pingId = res.data.data.ChargeInfo.id;
              let resSuccess = yield call(alipaySuccess, {pingId: pingId});
              window.location.href = `${origin}/applySuccess`;
              // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
            } else if (pingppRes == "fail") {
                // Ping++ 对象不正确或者微信公众号 / QQ公众号支付失败时会在此处返回
            } else if (pingppRes == "cancel") {
                // 微信公众号支付取消支付
                window.location.href = `${origin}/orderForm`;
            }

```

```
const getPingpp = function(arg) {
  return new Promise((resolve) => {
    pingpp.createPayment(arg, function(result, err) {
      resolve(result);
    })
  })
};
```
自己的原始代码：
```
// 最原始的写法
    let pingId = res.data.data.ChargeInfo.id;
              if (result == "success") {
              在这个里面好像是没有办法调用接口的
                  let resSuccess = yield call(applySuccess, {pingId: pingId})
              if(resSuccess.errcode === 0) {
                 if(resSuccess.data.id) {
                    window.location.href = `${origin}/applySuccess`;
                 }
                }
                // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
              } else if (result == "fail") {
                   // Ping++ 对象不正确或者微信公众号 / QQ公众号支付失败时会在此处返回
              } else if (result == "cancel") {
                   // 微信公众号支付取消支付
                  window.location.href = `${origin}/orderForm`;
               }
```
### 禁用微信分享功能
```
function onBridgeReady() {  
        WeixinJSBridge.call('hideOptionMenu');  
    }  
  
    if (typeof WeixinJSBridge == "undefined") {  
        if (document.addEventListener) {  
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);  
        } else if (document.attachEvent) {  
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);  
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);  
        }  
    } else {  
        onBridgeReady();  
    }  
```
https://blog.csdn.net/wyk304443164/article/details/72733946

### react里面关于标题是如何显示的


### 关于http和https的一些思考

### 关于landingpage的一些思考

播放按钮的绝对定位问题

第二个是slide的。

还有就是一个图片被放大了，始终是处于同一个位置。
![childAndParent](http://p7fhyq5kf.bkt.clouddn.com/parentWithChildren.png)
```
<div style={{position: 'absolute', bottom: '-1.3rem', right: '0.68rem'}}>
          <img style={{width: '7.4rem'}} src="//img.pipacoding.com/assets/new_landingpage/studywithparent.png" />
        </div>

这里我觉得比较关键的是图片的宽度和父级绝对定位的bottom的大小。
```


### 关于渲染
昨天犯了一个很大的错误
`onPlaying={this.videoPlaying.bind(this,url)}`
在一个函数里面传另一个带参数的函数

React 高阶组件
https://blog.csdn.net/mpdemp/article/details/74923332

### 关于视频refs的第一次使用。
值得学习很多。

### 我的邀请页面也有很多值得学习的地方
```
// 加载中
<ActivityIndicator
  toast
  text="邀请卡生成中..."
  animating={true}
  />
```
### 从某个分支的某一次commit切换新分支
https://www.aliyun.com/jiaocheng/25343.html

### 关于报json at position 97 或0 或1 类似
大都是后端返回的数据不是object格式。
而是两个object。就会报这样的错误。
已经遇见过两次了。

### 关于自适应字体
[参考连接](https://segmentfault.com/a/1190000004705207)
```
html 的fontSize 是什么，根据页面宽度自己设置的。
export default function winResize(doc, win) {
    let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      // 判断 orientationchange 是否是window 的全局属性
      recalc = function () {
        const clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = `${42 * (clientWidth / 320)}px`;// 其中“20”根据你设置的html的font-size属性值做适当的变化
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
  // orientationchange: The orientationonchange event is fired when the orientation of the device has changed.  设备的方向改变的时候
  // resize：The resize event fires when the document view(window) has been resized 文档视图调整大小的时候
```

### 加hash值的问题
### run build

### 手机浏览器
Android 手机而言: 使用最高就是Webkit 内核。

Webkit 内核 的使用范围则较为广泛， Android原生浏览器，苹果的Safari，谷歌的Chrome 都是基于Webkit开源内核开发的。

QQ浏览器X5 内核

Safari浏览器的内核 Webkit

### react插件 rc-tween-one 单页动画元素 
TweenOne 
类似gif的动画效果，代码如下
```
// js 
  function renderBody13() {
      return(
          <TweenOne
              animation={[
                { rotate: '+=10', duration: 2000, yoyo: true, repeat: -1 },
              ]}
              style={{
                  zIndex: 9999,
                  position: 'fixed',
                  top: '5rem',
                  left: '5.9rem',
                  display: 'inline-block',
                  transform: 'rotate(43deg)'
              }}
            >
           <div className={styles.body13} style={{top: parseInt(pageHeight/2) - 2 + 'rem'}}>
              <img 
                  src="//wwwcdn.firstleap.cn/m/img/zhuce.png"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = cls.url;
                    }
                  }}
                />
             </div>
          </TweenOne>
       )
  }
```

```
// css
.body13 {
   display: inline-block;
}
.body13 img {
   z-index: 9999;
   width: 2.2rem;
}
```
效果图如下:
[gif动效图](//img.pipacoding.com/assets/new2_landingpage/animation.gif)



---
2018 年 5月27号开始8月中旬
---
### 删除远程分支

git push origin :branch-name

### js取小数的余数和整数部分
设小数为 n;
小数的整数为 Math.floor(n);
小数的余数为 n - Math.floor(n);

### 关于组件用funtion 而不是 class 组件名称 extends Component {} 这样的形式

一次偶然的发现，代码如下：
```
父组件引用子组件代码
<Landingpage0 
          classMonth={classMonth} 
          classDate={classDate}
          qrcodeImg={qrcodeImg}
          cls={cls}
          hidePic={hidePic}
          price={price}
          pay={pay}
        />
```

```
子组件代码
function Landingpage0({  price, pay, cls, qrcodeImg, classMonth, classDate, hidePic, groupon }) {}
```
完全省略了this.props这样比较重复写的代码。

### urlBase64safe
关于图片拼水印，需要用到安全url
```
var URLSafeBase64 = require('urlsafe-base64') 
    console.log((query.name));
    let name =URLSafeBase64.encode(new Buffer(query.name));
    let userId = URLSafeBase64.encode(new Buffer(getUserInformation.userId))
```
我想说的是最重要的搜索
### 正则校验
`/^[a-zA-Z\d]+$/.test(valueNum)`

### 手机号正则校验 

/^1[3|4|5|7|8][0-9]\d{8}$/.test(isPhoneValue)

### JSON.stringify()
`{courseId: 101, publish: 1, payId: 1001}`
`encodeURI(JSON.stringify(filter))`
### 组件的坏处and好处
我觉得我是不太喜欢用组件的，我也觉得我是太喜欢用组件的。
### dva 里面跳转的新方式 可以跳的很快
```
import { routerRedux } from 'dva/router';
yield put(routerRedux.replace({pathname: '/applySuccess'}));
```
### setTimeout 绑定参数
<!-- 不要再用google搜索了，不要再搜了 -->
```
 function close(grade) {
    setTimeout(function() {
      dispatch({type:'landingpage/save',payload:{isMask:false}});
      window.location.href = `//mp.pipacoding.com/summerClass?courseId=${grade}&origin=landing`
    }.bind(grade),100);
  }
```
### 关于样式，一个标签绑定两个class样式
我发现很久以前不用的东西，很久以前我用的很熟练，之后不用了之后就会忘记掉了。
`styles.bgColor + ' ' + styles.bgColorFloat`
### 关于ref
```
import { Player } from 'video-react';

<Player 
    ref="player" 
    poster={poster}
    onPause={this.videoPause.bind(this,url)} 
/>

```
### nvm的安装以及使用
[nvm](http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/)

### 获取样式兼容的方式
```
getStyle(obj,name) {
    if(obj.currentStyle) {
      return obj.currentStyle[name];
    } else {
      return getComputedStyle(obj, false)[name];
    }
  }
```
### h5页面撑起高度
```
style={{ minHeight: `${config.pageHeight}rem`}}
```
### 关于跳转加快的两种方式
```
// Inside Effects
yield put(routerRedux.push('/logout'));
// Inside Effects // 带query 的方式
yield put(routerRedux.push({pathname: '/applySuccess',query:{classId:payload.dataInfo.id}}));
// Outside Effects
dispatch(routerRedux.push({pathname: '/applySuccess',query:{classId:payload.dataInfo.id}}));
// 能够看到和用window.location.href跳转url，的明显的区别，
在地址栏的用window,就是直接整个url地址都跳动了，但是用push这种方式，变化的仅仅是路由变化，
前面的window.location.origin 是没有变化的。
```
上面是在dva.1.0中的跳转方法。
dva2.0 的跳转方式如下:
```
  yield put(routerRedux.push('/user'), {name:'tangyue', age: 22});
  那么这个参数会如何接受到呢，如下代码:
  subscriptions: {
    history.listen((location) => {
      console.log(location.state);  // 这里的location.state就是传递过来的参数
      // 即为 {name: "tangyue", age: "20"}
      })
  },

```
### 关于元素属性offsetTop
```
var anchor = document.getElementById(selector);
if(document.body.scrollTop) {
  document.body.scrollTop = anchor.offsetTop;
} else if (document.documentElement.scrollTop) {
  document.documentElement.scrollTop = anchor.offsetTop;
}else {
  var oPos = anchor.offsetTop;
  window.scrollTo(0, oPos-36)
}
```
### 关于手机返回键
```
]  !function(pkg, undefined){
    var STATE = 'x-back';
    var element;

    var onPopState = function(event){
        event.state === STATE && fire();
    }

    var record = function(state){
        history.pushState(state, null, location.href);
    }

    var fire = function(){
        var event = document.createEvent('Events');
        event.initEvent(STATE, false, false);
        element.dispatchEvent(event);
    }

    var listen = function(listener){
        element.addEventListener(STATE, listener, false);
    }

    ;!function(){
        element = document.createElement('span');
        window.addEventListener('popstate', onPopState);
        this.listen = listen;
        record(STATE);
    }.call(window[pkg] = window[pkg] || {});

}('XBack');

XBack.listen(function(){
    window.location.href = 'https://www.baidu.com'
});
// 可以监听到手机的返回键.
```
### 关于loading 出现的大bug
1、 loading 方式
2、 && 我所遇到的fundebug 报错 ，包括滚动组件
### 关于ios 键盘和安卓键盘问题，针对这两个我的处理方式
### 关于用dva搭建项目，我所遇到的一些问题。
主要是关于绑定事件问题
配置文件问题
新的用法问题
关于select问题
### css 优雅的写法
#### 选择器
```
// .vue 文件
<div class="AboutUs_details content" :id="index" v-for="(value, index) in History">
      <p class="post" v-text='value.post'></p>
      <p class="pay" v-text="value.pay"></p>
      <P class="standard">
        <span v-for="valueR in value.standard" v-text="valueR"></span>
      </P>
</div>
// .css 文件
.AboutUs_details>p{
  text-align: center;
}
.AboutUs_details>p.post {
  margin: 100px auto 0;
  font-size: 26px;
}
.AboutUs_details>p.pay {
  margin: 12px auto;
  font-size: 24px;
  color: #ee6d0f;
}
.AboutUs_details>p.standard {
  margin: 12px auto;
  font-size: 14px;
  color: #9c9591;
}
.AboutUs_details>p.standard span{
  padding-left: 20px;
  margin-right: 20px;
}
.AboutUs_details>p.standard span:nth-child(1){
  background: url(//img.pipacoding.com/assets/pc/landingpage2.0/my/standard_0.png) no-repeat 0px center;
}
```
#### 全局定义，分开引用 （重点）
```
@imgUrl: "//img.pipacoding.com/assets/pc/landing3.0/";
@color_back_gray: rgba(240, 240, 240, 1);

// 使用
.select {
  background: url("@{imgUrl}select_001.png") no-repeat center 0px;
}
.select {
  p {
    span {
      color: @color_back_gray;
    }
  }
}
```

### 关于支付前提示
这个需求是根据后端接口的返回码，
用antd design 里面的toast去提示用户，
比如，你购买的课已经卖完了。
可是我做了很多很多次，得到的结果都是，
会出现点击第一次没有反应，第二次才会出现提示。
我一直是把 toast 写在routes层，却从未想过要把它写在modal层。
基于之前刚看过一个项目，用的是antd design 里的message提示，
是写在modal层。
几天再一次回到这个项目，我为什么也不写在modal。
今天终于把这个问题给解决了。
### 我决定要为dva写一个总结文档。
### 关于一个简单的js基础
我却每次都在网上搜索资料。
我觉得我不应该再去网上搜索资料，就可以写出来。
于是记录如下：
`moment().format('L').split('/').join('-')`
说明:2018/08/10  变成为  2018-08-10
### 关于网站加载慢的几个因素
### 复制一份数组，但是不改变原数组
默写一遍吧
.concat()
let newState = [].concat(state);
.map()
let newState = state.map((item) => item)
.slice()
let newState = state.slice(0)
es6 方法
let newState = [...state]

### 一个问题
because its MIME type ('text/html') is not a
supported stylesheet MIME type, and strict MIME
checking is enabled.

通过路由去点击一下，完全是可以展示页面的，但是
我不知道为什么，刷新一下就会报这个错误。 

### 获取scrollTop兼容各浏览器的方法
w.pageYOffset
属于window对象，IE9、firefox、chrome,opera
均支持该方式获取页面滚动高度值，并且忽略Doctype
定义规则。
window.scrollY
属于window对象，firefox、chrome，opera支持，IE不支持，忽略Doctype规则
document.documentElement.scrollTop
如果页面定义了doctype文档头，基本所有的浏览器都支持
（）

为了兼容，不管有没有DTD，可以使用如下代码:

```
var scrollTop = window.pageYOffset     // IE9+ 
                || document.documentElement.scrollTop    // firefox
                || document.body.scrollTop            // chrome
                || 0;
```


















