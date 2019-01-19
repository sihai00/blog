# 纯css实现下雪效果
效果如其名，想必都见过下雪（可能南方人除外哈哈），但下雪效果只是一类的名称，可以是红包雨等一些自由落体的运动效果，本文就是用纯`css`实现下雪的效果。

## 1.前言
由于公司产品的活动，需要实现类似下雪的效果。浏览器实现动画无非`css3`和`canvas`（还有`gif`），对比下`css3`和`canvas`的优缺点：
1. 动画自由度：`canvas`胜；
2. 复杂度：`canvas`胜；
3. 兼容性：`canvas`胜；
4. 性能：`css3`胜（`requestAnimationFrame`和硬件加速）。

由于流量较大对于性能有一定的要求，`canvas`对比`css3`会有更多的计算量导致性能可能不太好，所以选用`css3`实现下雪效果（ps：能用`css`解决的问题就不用`javascript`解决哈哈）。

**附上地址** 
[下雪效果Github](https://github.com/sihai00/blog/tree/master/fallSnow)

## 2.原理
本文所采用的是`css3`的`animation`。为`dom`元素添加`animation`属性就可以实现动画，例如w3school的例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>animation</title>
  <style>
    .animation{
      width:100px;
      height:100px;
      background:red;
      position:relative;
      animation:mymove 5s infinite;
      -webkit-animation:mymove 5s infinite;
    }
    @keyframes mymove{
      from {
        left:0px;
      }
      to {
        left:200px;
      }
    }
  </style>
</head>
<body>
  <div class="animation"></div>
</body>
</html>
```
当然这谁都会，但有个问题是，下雪并不是机械的下落，而是有快有慢、摆动幅度、时间不定，这里的重点是需要构造随机性，理性分析下
1. 在浏览器中下雪的起始点随机
2. 下雪的速度随机
3. 下雪过程中摇摆随机
4. 下雪从开始到落到地面的时间随机（延时随机和整个下雪过程的时间随机）

我们可以在css中找到这几点随机性的对应属性
1. 起始点：`position`的左右方位（动画我们一般采用定位，因为可以减少不必要的重排和重绘）
2. 速度：`animation-timing-function`（提供了丰富的速度属性）
3. 摇摆：`transform: translateX()`（在水平方向上的位移）
4. 时间：`animation-duration`和`animation-delay`

可能有人会问，这几个属性并不是随机的呀，并不像`Math.random`随机函数那样。我们换个思考方向，本文所说的随机是随机雪，并不是随机雪的属性。每个雪的下落时间、下落速度、摆动幅度是固定的，雪与雪之间的下落时间、下落速度、摆动幅度是不同，那么就达到效果了。

意识到这点，就剩下最后一个问题，怎样给每个雪不同的下落时间、下落速度、摆动幅度呢？这里我们使用真正的随机函数`Math.random`，利用data自定义属性配合`Math.random`和css的属性匹配规则，就可以确定动画效果了。
## 3.构造雪形状
3.1 一条线性渐变
!(./linear.jpg)[线性渐变]
```css
.linear{
  width: 100px;
  height: 100px;
  background: linear-gradient(0, green 40%, red 40%, red 60%, green 60%);
}
```

3.2 多条线性渐变画雪花
```css
.linear{
  width: 100px;
  height: 100px;
  background-image: linear-gradient(180deg, rgba(255,255,255,0) 40%, #fff 40%, #fff 60%, rgba(255,255,255,0) 60%),
    linear-gradient(90deg, rgba(255,255,255,0) 40%, #fff 40%, #fff 60%, rgba(255,255,255,0) 60%),
    linear-gradient(45deg, rgba(255,255,255,0) 43%, #fff 43%, #fff 57%, rgba(255,255,255,0) 57%),
    linear-gradient(135deg, rgba(255,255,255,0) 43%, #fff 43%, #fff 57%, rgba(255,255,255,0) 57%);
}
```

## 4.构造下雪动画

## 5.随机性

## 6.总结
学代码必须手写，学英语必须开口，学习必须主动！
