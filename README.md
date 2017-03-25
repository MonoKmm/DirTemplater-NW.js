# DirTemplater-NW.js
![head](https://github.com/MonoKmm/Images-folder/blob/master/DirTemplate/head.jpg)
## An application that custom directory names based on your own template
## 基于NW.js运行的小程序，根据目录文件夹名生成各种数据格式  

生成的内容由模板函数(Template) 和 替换表(Replacement) 来决定

## 食用步骤：  
1. 添加目标目录
2. 配置模板
3. 点击Result ,点击模板区域上方吃豆人图标
```javascript
//这是模板函数
function tem (dirList,Replacement,ReplacementArr) {
var regex = /data-\w+/g;
var js =
`
{
"vision" : "v1.0",
"type":"software",
"category":[
              ${...}
            ],
"list" : [
              ${...}
          ]
}
`;
return js;
}
```

函数有三个参数
* dirList: (Type:Array),数组中每个项目对应一个文件夹名称
* Replacement: (Type:Object),替换表(Replacement)的原文解析后的对象
* ReplacementArr: (Type:Array),替换表转换的数组  
  
  函数中可调用的方法有两个:
  ```javascript
  var regex = /data-\w+/g;
  arrRegex(dirList,regex)
  //对dirList数组各项用match(regex)处理，返回处理后的数组
    
  num(4)  
  //一个计数器，每次调用 + 1,传入的数字对应对返回值的前缀"0"的个数
  ```
