# pnpm 快速的，节省磁盘空间的包管理工具
1. 创建非扁平化的node_modules文件夹
2. pnpm的node_modules布局使用符号链接来创建依赖项的嵌套结构
3. 通过pnpm-workspace.yaml指定工作空间的方式支持monorepo

## 使用
1. 安装
```shell
npm i -g pnpm
```

2. 初始化
```shell
pnpm init
```

3. 新建 pnpm-workspace.yaml 文件
```text
packages:
 - 'packages/*'
```

4. 命令
```shell
# 安装在根目录的devDependencies -Dw
pnpm add typescript -Dw
# 安装在根目录的dependencies -w
pnpm add react -w
# 安装局部包依赖 -F
pnpm add vue-router -F <A包>
# 安装项目内的相互依赖 表示在B包中安装A包，@*表示默认同步最新版本，省去每次都要同步最新版本的问题
pnpm add <A包>@* -F <B包>
```

5. 在根目录下执行对应包里面的命令 在根目录下执行A包的dev命令
```text
"scripts": {
    ...,
    "dev:app": "pnpm -F <A包> dev"
}
```
