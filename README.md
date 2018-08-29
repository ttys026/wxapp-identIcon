# wxapp-identIcon
根据用户openID在小程序客户端随机生成SVG头像的插件.

## 使用

1. clone project或者下载压缩包，因为小程序对代码量有<2M的要求，只需要拷贝dist目录下需要使用的Style到小程序目录中。
2. 在js文件中引用: 
```
var IdentIcon = require('../../utils/githubStyle/index.js');
```

3. 在js文件中使用：
```
var data = IdentIcon('openID');
this.setData({image: data});
```
上述例子中openID也可以替换成任意字符串。

4.在wxml中插入图片：
```
<image src='{{image}}' class='avatar'></image>
```

## 截图

#### Github style:

 ![github style](https://raw.githubusercontent.com/tli4/wxapp-identIcon/master/demo/github.png)
 
#### Robohash Style:
 
 ![robohash style](https://raw.githubusercontent.com/tli4/wxapp-identIcon/master/demo/robohash.png)
 
## Credits
 
 #### HashTool from https://github.com/emn178/js-sha256
 #### Github style revised from https://github.com/stewartlord/identicon.js
 #### Robohash style revised from https://github.com/nimiq/robohash
