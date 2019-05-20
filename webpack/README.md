# webpack构建多页应用心得体会
`webpack`构建的基于`zepto`的多页应用脚手架，本文聊聊`webpack`构建多页应用的一些心得体会。

## 1.前言
由于公司旧版的脚手架是基于gulp构建的zepto多页应用（有兴趣可以看看[web-mobile-cli](https://github.com/sihai00/web-mobile-cli)），有着不少的痛点。例如：
1. 需要兼容低版本浏览器，只能采用`promise`，不能使用`await`、`generator`等。（因为`babel-runtime`需要模块化）
2. 浏览器缓存不友好（只能全缓存而不是使用资源文件的后缀哈希值来达到局部缓存的效果）
3. 项目的结构不友好（可以更好的结构化）
4. 开发环境下的构建速度（内存）
5. `gulp`插件相对`webpack`少且久远，维护成本高等等

这次升级有几个地方需要注意和改进：
1. 项目旧代码尽量做到无缝转移
2. 资源文件的缓存
3. 组件式的组织目录结构

Github仓库：
1. [gulp构建的旧版多页应用web-mobile-cli](https://github.com/sihai00/web-mobile-cli)
2. [webpack构建的多页应用web-mobile-webpack-cli](https://github.com/sihai00/web-mobile-webpack-cli)

## 2.多页
`webpack`的多页应用通过多入口`entry`和多实例`html-webpack-plugin`配合来构建，`html-webpack-plugin`的`chunk`属性传入对应`entry`的`key`就可以做到关联，例如：
```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
			filename: `pageOne.html`,
			template: `./src/pageOne.html`,
			chunks: ['pageOne']
    }),
    new HtmlWebpackPlugin({
			filename: `pageTwo.html`,
			template: `./src/pageTwo.html`,
			chunks: ['pageTwo']
		}),
		new HtmlWebpackPlugin({
			filename: `pageTwo.html`,
			template: `./src/pageTwo.html`,
			chunks: ['pageTwo']
		})
  ]
}
```
那么问题来了，开发新的页面每次都得添加岂不是很麻烦。这里推荐神器[glob](https://github.com/isaacs/node-glob)根据正则规则匹配。
```javascript
const glob = require('glob')

module.exports = {
  entry: glob.sync('./src/js/*.js').reduce((pre, filepath) => {
		const tempList = filepath.split('src/')[1].split(/js\//)
		const filename = `${tempList[0]}${tempList[1].replace(/\.js/g, '')}`
 
		return Object.assign(pre, {[filename]: filepath})
	}, {}),
  plugins: [
    ...glob.sync('./src/html/*.ejs').map((filepath, i) => {
			const tempList = filepath.split('src/')[1].split(/html\//)

			const fileName = tempList[1].split('.')[0].split(/[\/|\/\/|\\|\\\\]/g).pop()
			const fileChunk = `${tempList[0]}${fileName}`

			return new HtmlWebpackPlugin({
				filename: `${fileChunk}.html`,
				template: filepath,
				chunks: [fileChunk]
			})
		})
  ]
}
```
## 3.模板
项目没有直接使用`html`，而是使用了`ejs`作为模板，这里有至少两个好处：
1. 把公共的代码抽离出来
2. 传入公共的变量

```html
// header.ejs
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><%= title %></title>
</head>

// index.ejs
<!DOCTYPE html>
<html lang="en">
<% include ./header.ejs %>
<body>
	<!-- page -->
</body>
<script src="<%= publicPath %>lib/zepto.js"></script>
</html>
```

`<% include ./header.ejs %>`就是引用了`header.ejs`文件，`<%= title %>`和`<%= publicPath %>`是我在配置文件定义的两个变量，`publicPath`是为了统一`cdn`缓存服务器的域名，非常有用

## 4.垫片
项目中使用了`zepto`，所以需要垫片，所谓垫片就是shim 预置依赖，即全局依赖。
> webpack compiler 能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些 third party(第三方库) 可能会引用一些全局依赖（例如 jQuery 中的 $）。因此这些 library 也可能会创建一些需要导出的全局变量。这些 "broken modules(不符合规范的模块)" 就是 shim(预置依赖) 发挥作用的地方

垫片有两种方式：
1. 传统方式的**垫片**就是在`html`文件中，所有引用的`js`文件的最前面引用的文件（例如`zepto`）
2. `webpack`配置`shim预置依赖`

最终我选择了`webpack`配置`shim预置依赖`这种方式，因为：
1. 传统的方式需要每个页面都手动引入（虽说搭配`ejs`可以抽离出来成为公共模块，但还是需要每个页面手动引入公共模块）
2. 传统的方式需要多发一次请求去请求垫片
3. `webpack`可以把所有第三方插件的代码都拆分打包成为一个独立的`chunk`，只需一个请求

```javascript
module.exports = {
  entry: {...},
  module: {
  	rules: [
  		{
				test: require.resolve('zepto'),
				use: 'imports-loader?this=>window'
			}
  	]
  },
  plugins: [
    new webpack.ProvidePlugin({
			$: 'zepto'
		})
  ]
}
```

## 5.拆分
一般来讲`webpack`的配置`entry`中每个`key`就对应输出一个`chunk`，那么该项目中会提取这几类`chunk`：
1. 页面入口（`entry`）对应的`chunk`
2. `common`：多次引用的公共文件
3. `vender`：第三方依赖
4. `manifest`：`webpack`运行时（`runtime`）代码，它存储着`webpack`对`module`和`chunk`的信息

```javascript
module.exports = {
  entry: {...},
  module: {...},
  plugins: [],
  optimization: {
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					name: 'vendors',
					filename: 'js/vendors.[contenthash:8].js',
					priority: 2,
					reuseExistingChunk: true
				},
				common: {
					test: /\.m?js$/,
					chunks: 'all',
					name: 'common',
					filename: 'js/common.[contenthash:8].js',
					minSize: 0,
					minChunks: 2,
					priority: 1,
					reuseExistingChunk: true
				}
			}
		}
	}
}
```
这里注意的有两点
1. 优先顺序：第三方插件的`priority`比`common`代码的`priority`大
2. 提取`common`代码：`minChunks`为引用次数，我设置为引用2次即提取为公共代码。`minSize`为最小字节，设置为0

## 6.缓存
缓存的目的是为了提高加载速度，`webpack`在缓存方面已经是老生常谈的了，每个文件赋予唯一的hash值，只有更新过的文件，hash值才改变，以达到整体项目最少文件改动。

### 6.1 hash值
`webpack`中有三种`hash`值：
1. `hash`：全部文件同一`hash`，一旦某个文件改变，全部文件的hash都将改变（同一`hash`不满足需求）
2. `chunkhash`：根据不同的入口文件（`Entry`）进行依赖文件解析、构建对应的chunk，生成对应的哈希值（问题是将样式作为模块import到JavaScript文件中的，它们的`chunkhash`是一致的，一旦改变`js`文件，即使`import`的`css`文件内容没有改变，其`chunkhash`值也会一同改变，不满足需求）。
3. `contexthash`：只有模块的内容变了，那么hash值才改变（采用）

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  },
  output: {
		path: 'src',
		chunkFilename: 'j[name].[contenthash:8].js',
		filename: '[name].[contenthash:8].js'
	},
  plugins: [
    new HtmlWebpackPlugin({
			filename: `pageOne.html`,
			template: `./src/pageOne.html`,
			chunks: ['pageOne']
    }),
    new HtmlWebpackPlugin({
			filename: `pageTwo.html`,
			template: `./src/pageTwo.html`,
			chunks: ['pageTwo']
		}),
		new HtmlWebpackPlugin({
			filename: `pageTwo.html`,
			template: `./src/pageTwo.html`,
			chunks: ['pageTwo']
		})
  ]
}
```

### 6.2 module id
仅仅使用`contexthash`还不足够，每当`import`的资源文件顺序改变时，`chunk`依然会改变，目的没有达成。
要解决这个问题首先要理解`module`和`chunk`分别是什么，简单理解：
1. `module`：一个`import`对应一个`module`（例如：`import zepto from 'zepto'`中的`zepto`就是一个`module`）
2. `chunk`：根据配置文件打包出来的包，就是`chunk`。（例如多页应用中每个`entry`的`key`值对应的文件）

因为`webpack`内部维护了一个自增的`id`，依照顺序赋予给每个`module`，每当新增或者删减导致`module`的顺序改变时，受影响的`chunk`的`hash`值也会改变。解决办法就是使用唯一的`hash`值替代自增的`id`。
```javascript
module.exports = {
  entry: {...},
  module: {...},
  plugins: [],
  optimization: {
		moduleIds: 'hashed'
	}
}
```
## 7.总结
