## array

### Array Partition I

1. array.sort() 对于负数的排序会出错，应改成`array.sort(function(a,b) { return a-b });`
2.`Math.min(...array.slice(n, n+2))`   将内部的数组转化成值形式

### Reshape the Matrix

用到了这个平铺数组

```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  ( accumulator, currentValue ) => accumulator.concat(currentValue),
  []
);
``` 

### Toeplitz Matrix

让我再写一遍，我可能还是会写错的

### Move Zeroes

splice
用法
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
start 修改的开始位置
item1, item2, ...  要添加进数组的元素，从start位置开始
注意会改变原始数组。

slice
用法
并不一定是数组，字符串也是可以的
arr.slice([begin[, end]])
注意并不会改变原始数组。

从后向前循环，不能从前向后循环，从前向后循环会报错的。

### Position of Large Groups

重新再写一遍吧

### Majority Element

一个数组里面有重复数字元素仍旧是会排序的。

返回也是排序后的数组，sort() 会更改掉原数组。

### Degree of an Array

一个数组里面有重复的元素，重复次数最多的最短长度

### Maximum Product of Three Numbers

arr.sort();  sort 会改变原数组
sort() 并不会排序两位数，三位数。
arr.sort(function(a, b) {return a - b;});
arr.sort((a, b) => a - b);

### Longest Continuous Increasing Subsequence
连续增长数的长度

最近脑袋被卡死了，leetcode 看着就觉得很是乏味。
不是乏味，而是做不出来。

既然最近写leetcode写不出来，就说明我需要学些东西了。
我发现我最近一直没有发现的一个错误。
我写了一个for循环，里面嵌套了一个if嵌套语句。
但是这样写，我却从未意识到有什么错误，我为自己感到悲哀。
```
for(let i = 0; i < nums.length; i++) {
    if(nums[++i]>nums[i]) {
        .... 
    // 这里里面的nums[++i]和nums[i]其实这两个值永远
    // 不可能小于或者是大于，只有可能是等于
    }
}
```
### Degree of an Array
只是觉得我得方法是如此得low。
// 这道题是我照别人抄的












