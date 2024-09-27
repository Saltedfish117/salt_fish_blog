:::info
jenkins:  [http://jekins.techsung.com/login?from=%2F](http://jekins.techsung.com/login?from=%2F)

git : [http://git.techsung.com/](http://git.techsung.com/)

:::

# -git
##  	-分支
### flow
![](https://cdn.nlark.com/yuque/0/2024/png/35708888/1722571349192-4ccae0d5-949f-45bd-a92a-eac10723e44d.png)

### 常见规范

<font style="color:rgb(33, 37, 41);">master 分支</font>

<font style="color:rgb(33, 37, 41);">master 为主分支，也是用于部署生产环境的分支，确保master分支稳定性， master 分支一般由develop以及hotfix分支合并，任何时间都不能直接修改代码</font>

<font style="color:rgb(33, 37, 41);">develop 分支</font>

<font style="color:rgb(33, 37, 41);">develop 为开发分支，始终保持最新完成以及bug修复后的代码，一般开发的新功能时，feature分支都是基于develop分支下创建的。</font>

<font style="color:rgb(33, 37, 41);">feature 分支</font>

                    * <font style="color:rgb(33, 37, 41);">开发新功能时，以develop为基础创建feature分支。</font>
                    * <font style="color:rgb(33, 37, 41);">分支命名: feature/ 开头的为特性分支， 命名规则: feature/user_module、 feature/cart_module</font>

<font style="color:rgb(33, 37, 41);">release分支</font>

<font style="color:rgb(33, 37, 41);">release 为预上线分支，发布提测阶段，会release分支代码为基准提测。当有一组feature开发完成，首先会合并到develop分支，进入提测时会创建release分支。如果测试过程中若存在bug需要修复，则直接由开发者在release分支修复并提交。当测试完成之后，合并release分支到master和develop分支，此时master为最新代码，用作上线。</font>

<font style="color:rgb(33, 37, 41);">hotfix 分支</font>

<font style="color:rgb(33, 37, 41);">分支命名: hotfix/ 开头的为修复分支，它的命名规则与feature分支类似。线上出现紧急问题时，需要及时修复，以master分支为基线，创建hotfix分支，修复完成后，需要合并到master分支和develop分支</font>

<font style="color:rgb(33, 37, 41);"></font>





> [Git 使用规范流程 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2015/08/git-use-process.html)
>

> [大厂git分支管理规范：gitflow规范指南 - kevin_ying - 博客园 (cnblogs.com)](https://www.cnblogs.com/kevin-ying/p/14329768.html)
>

### 目前


**master_**项目名:

某个项目的主分支

**dev_**项目名:

某个项目的开发主分支

**feature_**项目名_人员名称 :

**远程仓库仅能出现一个员工的个人分支**

xx员工开发xx个项目的个人分支



## -commit message 提交格式
> [超详细的Git提交规范引入指南 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903793033756680)
>

**[类型] : "说明"**

**[type] : "message"**

feat - 新功能 feature

fix - 修复 bug

file - 文件操作

npm - 包依赖变动

docs - 文档注释

style - 代码格式(不影响代码运行的变动)

refactor - 重构、优化(既不增加新功能，也不是修复bug)

perf - 性能优化

test - 增加测试

chore - 构建过程或辅助工具的变动

revert - 回退

build - 打包

# 
# 
