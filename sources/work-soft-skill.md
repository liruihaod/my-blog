我所做的一切都是为了提高工作效率和，和能够快速掌握一项技能。
我觉得这是一项值得我去努力做的事情。
1. 关于flex 布局 
其中左边是图片，右边是文本。当容器宽度不够的时候，右边的文本会挤压左边的图片。使得图片变形。
这样的时候，我们应该如何去做。给右边的文本容器设置属性: flex: 1;
2. 关于jsx dva
这种问题我觉得得要分几种情况。
第一种
`function({shareData}) { return()}`  在return的前面又定义了function b()函数，那么我在return里面如何引用这个function函数.
首先要明确的是shareData，这个值在b函数里面是可以获取到的，因此并不需要通过传参的方式给它传进去。
在return里面只需要这样`{shareData? b():null}` 调用就可以实现。
举列说明：
```
function a() {
    function b() {
        console.log('bbbb');
    }
    return b();
}

// 执行
a();
onClick = {() => editItem()} // 其实这样就和上面的很类似
```
第二种
关于纯组件
要绑定this值的几种方式
首先纯组件是长这样的。
```
class App extends Component {
	handle2(string) {

	},
	handle3() {

	},
	handle4 = () => {

	}
	render() {
		const handle5 = function(str) {

		}
		const handle6 = (str) => {

		}
		return (
			// 以下的下面写的函数都是要执行的
			<div>
				{this.handle2(string)} // 写的很好，very good
				{this.handle3()}
				{this.handle4()}
				{handle5('你好')}
			</div>
			// 以下的下面写的函数都是我在点击按钮的时候，执行的
			<button onClick={() => this.handle2('Hello world')}></button>
			<button onClick={this.handle3.bind(this)}></button>
			<button onClick={this.handle3}></button>
			// 突然发现{this.handle3}也是可以的，要不然你可以用箭头函数打印下this，
			// 会发现有handle3函数
			<button onClick={this.handle4}></button>
			<button onClick={() => handle5('hhh')}></button>
			<button onClick={() => handle6('test')}></button>
		)
	}
}
export default App;
```
第三种 关于非纯组件funciton 开头 
相对来说就比较简单了，如下：
```
import React from 'react';

export default function Test() {
    function test() {
        console.log('test function');
        return <span>test function</span>
    }

    const test1 = () => {
        console.log('test1');
        return <span>test1</span>
    }
    const test2 = function(str) {
        console.log(str);
        return <span>{str}</span>
    }
    const test3 = (s) => {
        console.log(s);
        return <span>{s}</span>
    } 
    return (
        <div>
            <div>
                Test folder
                {test()}
                {test1()}
                {test2('test2')}
                {test3('test3')}
            </div>
            <button onClick={test}>test</button>
            <button onClick={test1}>test1</button>
            <button onClick={() => test2('test2')}>test2</button>
            <button onClick={() => test3("test3")}>test3</button>
        </div>
    )
}
```
3. 关于flex 布局下
不同页面的自适应
`jusitify-content: space-between` 使用这个属性的时候。
如果你给的宽度是`width: 80%`; 那么在手机端宽屏的会导致中间的间隔是特别的大。非常的不好看。
我今天想到一个办法即如下
```
    width: 70%;
	min-width: 540px;
	margin: 0 auto;
```
给它一个最小的宽度，然后正式的宽度为总宽度的70%，这样就可以完美的解决问题。
4. 其实在很多情况下，我们解决了一个比较难的问题，当解决了之后，我们往往忘记了自己是如何解决的。
5. 你必须对一个东西很熟，你才能重新写出它。
6. 我觉得 人的自我意识里面，自私的让自己变得更轻松。

7. 5月14日 周总结

----10点37分 架构师开会
----11点56分 调整oldlandingpage 样式问题，up的gif 和每行字体不掉下来。
----16点15分 吃饭 加 调整video-react的样式问题，并提交上代码给张成，并测试old landingpage
----16点npm run build 打包，并调整video的高度样式问题。重新提交仓库。

8. 5月14日 一些想法
 (1)我觉得应该少推测试环境
 (2)果然不能吃饱饭，吃饱饭就困的不行啊

为什么我在本地的js文件里面写for循环，明明是i++，循环的结果却全是偶数。

9. landing 上的一次Flex
当时是要让播放按钮处于矩形图片的正中间
我是用绝对定位然后调节 left 和top 的百分比，让其处于正中间的位置。
但是在不同的手机总归是有些不居中。

10. 关于测试的bug问题
放宽心
11. 关于做好一个项目
其实更多是仔细，再仔细。关于用vue 去写页面待做。
关于暑期班活动，我遇到的问题。
12. 6月20日 总结
1、跳转不要用href去跳转，会加快速度。
2、支付用testing 去测试支付。
3、关于滚动。
13. 为什么人有时候会对看到的bug，视而不见呢。
14. 我又开始不写总结了，做完一个项目，一点思考的都没有。
15. 学习的最大的收获应该是  学会搜索， 学会搜索。
16. 关于滚动我最不擅长的部分应该还是css 样式。
17. 不知道最近是怎么了，总是喜欢检查，又检查，再次的检查。
不喜欢这样的状态。最近做leetcode，看见一题是不会一题。
现在我觉得要有整体意识。
18. 8月19日，我感觉刷一遍freecodecamp对js基础能够有更清楚的认识。
19. 我怎样才能快速的记忆。将难以理解的，组合自己能够理解的话。
20. 为什么我做完题目之后，不动源码。
22. 我觉得很多问题，我曾经都是遇到过的，但是我再也不记得答案了。
或许我也不应该怪罪自己，本来知识就需要多次重复才会记得。尽自己最大的努力就好了。
23. 关于一个不会写的css样式，第一个直觉应该是google搜索该样式属性，然后再加上mdn，能够解决近80%的样式问题
24. 人很多时候，无论是做一件事，做工作，无论是什么事情，人总是做好了这件事，当要把这件事向着做的更好的方向时，
总是犹犹豫豫，没有任何的自信，甚至存在惰性，觉得自己做的已经可以了。

关于一直做后台功能，总得要有些总结才是。

1. 关于localstorage里，如果这个storage 里的值是时时在变化的。将取localstorage里的值，写在utils里，会导致，取得到的值，并不是当前所取的值。
而是上一次所取得到的值。

2. 关于amount为分的记录，因为后端存储的是分，因此有必要在后端所给的数据基础上除以100并保留两位小数。

3. 过去我对于细节的注重，真是糟糕的不行。

4. 因切错分支，而导致的以前记忆中是没有修改变化的，然而实际上是有的。而导致的错误。



9月11日
记录一次用git pull，而造成的代码缺失问题。
（1）从当前代码去 git pull master 上的代码。
 (2) 还是从master 上 新建一个分支，然后在这个分支的基础上，git pull 我新增加的代码的分支。
上述两种情况都会出现问题。

2019 年 11月
对未来暗淡无光的害怕，恐惧，支撑着我继续努力。

1、 整理以前所有的工作笔记。我觉得这些思考异常的重要。
2、 我觉得写好dom,有要点 (1) 思路清晰，(2) 没有任何多余html标签
3、 需要判断工作中，哪些是需要我们记忆，哪些是不需要我们记忆的。

"{ col: index !== 0,  gray: index === 0}"
4、 对于解决问题，搜索问题，我们应该有怎样的思考方式。

比如： 现在我们要搜索，用mysql语句， 更新数据库的多个字段。
传参的更新，不传参数的不更新。

但是我搜索了两三次之后，都没有找到比较符合要求的。这个时候，我们应该如何做呢。

这个时候，我就在想，用我自己所学的知识，我能不能折腾出来。

5、 关于我们究竟应该如何学习新知识，最近严重感觉自己的智商被虐。









