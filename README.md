ui-sticky
=============

跨平台吸顶吸底组件。

## 综述

* 版本：1.0.0
* 浏览器支持：所有浏览器
* demo: 

## 安装


浏览器引入

	<script src="ui-sticky.js"></script>

npm安装

	npm install ui-sticky
	require('ui-sticky');

## 使用
	
	<div id="sticky">sticky element</div>
	var Sticky = require('ui-sticky');
	var sticky = new Sticky({
		el: 'sticky'
	});

	sticky.destroy();

## option

初始化sticky需要至少一个参数，一共有两个参数
	
### el

定义需要sticky的元素，这里传入元素的id

**Examples:**
	
	<div id="sticky">sticky element</div>
	new Sticky({
		el: 'sticky'
	});

### top or bottom

定义sticky元素距离顶部或者底部多少触发吸附逻辑。可以不填

**Default:** top: '0px'

	<div id="sticky">sticky element</div>
	new Sticky({
		el: 'sticky'
	});
	// 默认top: '0px'

**Example:**

	<div id="sticky"></div>
	new Sticky({
		el: 'sticky',
		bottom: '20px' // 距离底部部20像素触发吸顶
	});

### css3

定义吸顶吸底方法是否使用css3特性`positon:sticky;`

**Default:** css3: true

**Example:**

	<div id="sticky"></div>
	new Sticky({
		el: 'sticky',
		css3: false // 定义吸顶吸底方法不使用css3属性
	});

### container

如果需要固定的元素在局部滚动容器里，需要指定滚动容器

**Default:** container: window

**Example:**

	<div id="sticky"></div>
	new Sticky({
		el: 'sticky',
		container: 'sticky-wrapper'
	});

**注意：**局部固定方法只能使用非css3方式
	
## methods

支持的方法

### destroy

销毁当前绑定sticky的对象
	