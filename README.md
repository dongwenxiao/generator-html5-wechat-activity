# generator-html5-wechat-activity
Generator wechat activity page base and libs.

####使用

安装Yeoman(yo)

```shell
npm install yo -g
```

安装微信yo生成器

```shell
npm install solution-sage/generator-html5-wechat-activity -g
```

定位到准备生成项目的文件夹

```shell
cd 项目目录
```

生成项目 yo [generator name] [project name]

```shell
yo html5-wechat-activity hellowold
```

选择你的配置项并生成文件完成


安装依赖node包

```shell
npm install
```

此时项目已经搭建完成

执行打包测试下

```shell
gulp
```

打开项目根目录下的dist文件夹并在浏览器里打开index.html测试


发现引用的css和js文件链接后边都加上了v=(md5)这样的风格，说明ok了，你可以继续编写你的业务逻辑了。