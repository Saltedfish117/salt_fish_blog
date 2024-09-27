# Nodejs

## 介绍

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，是一个应用程序。

官方网址 [https://nodejs.org/en/](https://nodejs.org/en/)，中文站 [http://nodejs.cn/](http://nodejs.cn/)

## 作用

-   解析运行 JS 代码
-   操作系统资源，如内存、硬盘、

## 应用场景

-   api 接口服务
-   网页聊天室
-   动态网站, 个人博客, 论坛, 商城等
-   后端的 Web 服务，例如服务器端的请求（爬虫）、搭建后台管理系统
-   前端项目打包(webpack）

## 使用

### 下载安装

#### 下载

-   官网：https://nodejs.org/en，历史版本下载 [https://npm.taobao.org/mirrors/node/](https://npm.taobao.org/mirrors/node/)
-   Nodejs 的版本号奇数为开发版本，偶数为发布版本，我们选择**偶数号的 LTS** 版本

> Long Term Support（LTS）:长期支持版本。软件更新与安全和维护修复的时间很长

#### 安装

双击打开安装文件，一路下一步 next 即可，默认的安装路径是 `C:\Program Files\nodejs`

安装完成后，新建一个 CMD 命令行窗口下运行 `node -v`，如显示版本号则证明安装成功，反之安装失败，重新安装。

```plain
node -v
```

```
v18.15.0
```

### 初体验

#### 交互模式

在命令行下输入命令 `node`，这时进入 nodejs 的交互模式

```shell
node
```

```shell
Welcome to Node.js v18.15.0.
```

```shell
Type ".help" for more information.
```

```shell
 1 + 1
```

```shell
2
```

#### 文件执行

创建文件 hello.js ，并写入代码 console.log('hello world')，命令行运行 `node hello.js`

快速启动命令行的方法

-   在文件夹上方的路径中，选中全部路径，直接输入 cmd 即可
-   使用 vscode 自带的命令行终端

```shell
node .\hello.js
```

#### VScode 插件运行

安装插件 『code Runner』, 文件右键 -> Run code

#### 注意

-   在 nodejs 环境下，不能使用 BOM 和 DOM
-   也没有全局对象 window，全局对象的名字叫 global

### Buffer(缓冲器)

#### 介绍

Buffer 是一个和数组类似的对象，不同是 Buffer 是专门用来保存二进制数据的

#### 特点

-   大小固定：在创建时就确定了，且无法调整
-   性能较好：直接对计算机的内存进行操作
-   每个元素大小为 1 字节（byte）

#### 操作

##### 创建 Buffer

-   直接创建 Buffer.alloc
-   通过数组和字符串创建 Buffer.from

##### Buffer 读取和写入

可以直接通过 `[]` 的方式对数据进行处理，可以使用 toString 方法将 Buffer 输出为字符串

-   对 buffer 进行读取和设置
-   toString 将 Buffer 转化为字符串

```javascript
// 创建一个10字节的buffer
const buf1 = Buffer.alloc(10);
console.log(buf1.toString()); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 通过字符串创建buffer
const buf2 = Buffer.from("iloveyou");
console.log(buf2); // <Buffer 69 6c 6f 76 65 79 6f 75> // 都是字符在 ASCII 码表中对应的数字, 是 16 进制的表示方式。如字符i对应ascii码是105，转16进制是69

console.log(buf2[0]); // 105   打印的是10进制

// 修改buffer
buf2[0] = 99; // 99对应ascii码表是c
// 将buffer转成字符串
console.log(buf2.toString()); // cloveyou
```

##### 关于中文

一个 UTF-8 的中文字符大多数情况都是占 3 个字节

```javascript
const buf = Buffer.from("我爱你");
console.log(buf); // <Buffer e6 88 91 e7 88 b1 e4 bd a0>
```

##### 关于单位换算

单位换算公式（注意 B、b 大小写）

1TB=1024GB

1GB=1024MB

1MB=1024KB

1KB=1024B

1B=8b(1Byte=8bit ,1 字节=8 位）Byte 为字节，bit 为位

平时所说的网速如： 10Mb   这里指的是 10 兆位每秒 ，所以理论下载速度 除以 8 才是正常的理解的下载速度

10Mb 的下载速率=10Mb/8=1.25MB（除以 8 就是将小 b 转换成大 B 就可以了）

### 文件系统 fs

fs 全称为 file system，是 NodeJS 中的内置模块，可以对计算机硬盘中的文件进行**增删改查**等操作。

##### 文件写入

-   简单写入
    -   fs.writeFile(file, data, [,options], callback);
    -   fs.writeFileSync(file, data,[,options]);

```javascript
const fs = require("fs");
// flag 标志   a  append 追加  w  正常写入
fs.writeFile("./index.html", "星星之火，可以燎原\r\n", { flag: "a" }, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("写入成功...");
});
```

-   流式写入
    -   fs.createWriteStream(path[, options])

```javascript
//创建写入流对象
const ws = fs.createWriteStream("./admin.html");

//写入内容
ws.write("床前明月光\r\n");
ws.write("疑是地上霜\r\n");
ws.write("举头望明月\r\n");
ws.write("低头思故乡\r\n");

//关闭写入流
ws.close();
```

##### 文件读取

-   简单读取
    -   fs.readFile(file, function(err, data){})
    -   fs.readFileSync(file)

```javascript
fs.readFile("./index.html", (err, data) => {
	// err 错误对象  data 读取到的文件内容 是一个 Buffer 类型的数据
	if (err) {
		return console.log(err);
	}
	console.log(data.toString());
});
```

-   流式读取
    -   fs.createReadStream();

```javascript
//1. 引入 fs 模块
const fs = require("fs");

//2. 创建读取流对象
const rs = fs.createReadStream("./index.html");

//3. 绑定事件
// 当读取文件内容时, 触发该事件
// chunk 可以获得读取到的内容, chunk 块儿, 名字是可以改的
rs.on("data", (chunk) => {
	console.log(chunk.toString());
});
```

    -  注意：
    -
        * readFile  ：读取小文件适合
        * createReadStream  ：读取大文件适合

案例练习：复制文件并重命名!!

```javascript
// 复制文件  ./夏天的风.mp3  =>  ./凉爽的风.mp3
const fs = require("fs");

//创建流对象
const rs = fs.createReadStream("./夏天的风.mp3");
const ws = fs.createWriteStream("./凉爽的风.mp3");

//写入
// rs.on('data', (chunk) => {
//   ws.write(chunk)
// })

//简便操作  pipe 管道   流水线
rs.pipe(ws);
```

##### 文件删除

-   fs.unlink('./test.log', function(err){});
-   fs.unlinkSync('./move.txt');

```javascript
const fs = require("fs");

//异步删除  不进回收站  不能删除文件夹
// fs.unlink('./home.html', (err) => {
//   if (err) throw err
//   //输出
//   console.log('删除成功')
// })

//同步删除
fs.unlinkSync("./test.html");
```

##### 移动文件 + 重命名

-   fs.rename('./1.log', '2.log', function(err){})
-   fs.renameSync('1.log','2.log')

```javascript
const fs = require("fs");

//重命名 rename 重命名
// fs.rename('./admin.html', '后台.html', (err) => {
//   if (err) throw err
//   //没有报错
//   console.log('重命名成功')
// })

//移动文件   文件路径           新的文件路径
// fs.rename('./后台.html', './file/admin.html', (err) => {
//   //判断
//   if (err) throw err
//   console.log('移动成功....')
// })

//同步修改
fs.renameSync("./index.html", "./home.html");
```

##### 文件夹操作

-   mkdir   创建文件夹
-   rmdir 删除文件夹
-   readdir   读取文件夹
-   stat 读取文件的状态

```javascript
const fs = require("fs");

// 创建文件夹 assets
// fs.mkdir('./assets', (err) => {
//   if (err) throw err
//   //成功提示
//   console.log('创建成功...')
// })

//递归创建
fs.mkdir("./a/b/c", { recursive: true }, (err) => {
	if (err) throw err;
	//成功提示
	console.log("创建成功...");
});

//读取文件夹
fs.readdir("./file", (err, files) => {
	if (err) throw err;
	console.log(files);
});

//绝对路径   d:/ 路径中 『/』 不能省略
fs.readdir("d:/", (err, files) => {
	if (err) throw err;
	//输出文件列表
	console.log(files);
});

//删除文件夹
fs.rmdir("./assets", (err) => {
	if (err) throw err;
	console.log("删除成功");
});

//递归删除
fs.rm("./a", { recursive: true }, (err) => {
	if (err) throw err;
	console.log("删除成功....");
});

//读取文件的状态
// console.log(__dirname)
fs.stat("./hi.html", (err, stats) => {
	if (err) throw err;
	// 输出 状态对象 stats   {size: 大小(字节)  atime: 最后的访问时间  mtime: 最后的修改时间，ctime:创建时间 }
	// console.log(stats)
	console.log(stats.isFile());
	console.log(stats.isDirectory());
});
```
