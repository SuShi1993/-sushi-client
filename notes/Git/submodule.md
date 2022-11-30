# 为什么会有submodules？
1. 解决公共代码问题
    * 如果某些文件，在项目A与B中都会用到，例如组件库，就可以作为submodule来管理，减少重复代码。
2. 解决团队维护问题
    * 如果一个大项目是一个大的Git仓库，需要统一编译，不同模块不同团队维护，放在一个Git仓库中难以管理，权限难以区分。submodules可以让每个团队负责的模块就是一个Git仓库，这些仓库都被包含在同一个主Git项目下。
    * 主项目、submodule 两者各自是完整的Git仓库。
# 如何使用
1. 在仓库A中，通过
```shell
    git submodule add <仓库B的git地址>
```
可以把仓库B作为仓库A的submodule，此时A成为了主项目。  
这样操作会在主项目下新建个文件夹，名字就是submodule仓库名，内容是对应git仓库的完整代码。
2. 指定目标名称或路径，可使用
```shell
    git submodule add <仓库B的git地址> <目标文件夹 可多层>/<自定义名称>
```
# 父子关系存在哪里？
* 关系是保存在主项目的Git仓库中，所以子仓库并不知道自己被谁使用
* 主项目中有一个.gitmodules 文件  
```
   [submodule "submodule路径"]
       path = submodule路径
       url = <子项目git地址>
```
# submodule提交更新
1. 方法一：clone子项目，直接在子项目提交更新
2. 方法二（推荐）：在主项目中更新  
在主项目中的B文件夹做commit后。文件夹B中就有了新的commit id。此时主项目A中所记录的commit id也会变更。
# 如何在主项目拉取submodule的更新
1. 方法一：cd submodule 后 git pull
2. 方法二：git submodule update --remote <B文件夹相对路径>
