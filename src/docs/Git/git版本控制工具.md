# git 代码版本控制软件

## 为什么要使用代码版本控制软件

作用：

1. 团队协作开发：多个人员开发不同的功能模块，最终要合并代码。
2. 版本回退（可追溯）：可让项目回到指定的版本，即后悔药。
3. 代码备份：怕电脑系统奔溃，没事，只要代码提交到了仓库中，可重新拉取下来。

常见的代码版本控制软件有 svn(集中式)、git （功能非常强大）

## git 工具介绍

-   git 是一个开源的代码版本控制系统，可以有效、高速地处理项目版本管理。
-   git 特点：分布式。即 git 客户端和服务器可以同时保存多个代码版本.
    -

> svn:是一个集中式。即所有的代码版本全都是存在服务端。

-   git 发明者：是 Linux 创始人[林纳斯](https://baike.baidu.com/item/%E6%9E%97%E7%BA%B3%E6%96%AF%C2%B7%E6%9C%AC%E7%BA%B3%E7%AC%AC%E5%85%8B%E7%89%B9%C2%B7%E6%89%98%E7%93%A6%E5%85%B9/1034429) ，最开始是用于管理 Linux 内核源码的。

git 是 C/S 架构的软件

-   C: client 客户端，自己需要安装
-   S: server 服务端，可以自己搭建 git 服务器，或使用第三方的如 github 或码云仓库。有些企业也会搭建自己私有的代码托管服务器。



其中 github、码云是属于第三方的代码托管平台。

# 安装 git 客户端工具

安装时候，注意自己系统的位数。64 还是 32 位

下载地址：[https://git-scm.com/download/win](https://git-scm.com/download/win)


安装的时候选择安装路径即可，然后一路 next 即可。安装好后创建文件夹，进去鼠标右键会多出以下两个选项，代表 git 工具安装完成。  


cmd 命令窗口中查看安装的版本号

```plain
C:\Users\zlf>git -v
git version 2.37.1
```

# 全局设置提交的用户名和邮箱

全局设置：必须先要设置提交的用户名和邮箱，否则无法提交代码。

```plain
git config --global user.name 名字     #叫啥名字
git config --global user.email 邮箱	#怎么联系你
```

查看配置信息

```plain
git config --list
```

进入仓库中也可设置独立的名字，去掉`--global` 即可

```plain
git config user.name 名字     #叫啥名字
git config user.email 邮箱	#怎么联系你
```

# 创建 git 仓库

从本地文件夹创建一个 git 仓库，步骤如下：

1. 创建一个空文件夹：如`shop`
2. 进入`shop`文件夹中，点击空白处，鼠标右键选择`Git base here`， 输入`git init`指令，此时目录会生成一个`.git`的目录。那么 git 库就创建成功了。



注意：

-   由于`.git`,是隐藏目录，默认不显示出来，找到文件夹上方的 **查看->显示->隐藏的项目**，将其选中
-   不要去改`.git`目录中的任何文件，否则会破坏 git 仓库。

# git 工作流

工作区：我们的工作目录。

版本库：存储仓库代码的地方。存在于`.git目录`中

-   暂存区：存在于`.git`目录中的`index`文件中
-   本地仓库：代码实际存储的地方。且默认会有个 master 分支。

# git 常用指令

查看命令如何使用，输入：`git commit --help` 或 `git commit -h`

git 使用文档：[https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)

## git add

默认在工作区创建的文件是属于未跟踪（`Untracked files`:）的，需要执行 add 指令将其添加到暂存区。

add 指令作用：添加当前工作目录中的文件添到暂存区中:

```plain
git add .   #添加当前工作目录中的所有文件到暂存区
git add filename    #添加当前工作目录中指定文件到暂存区:
```

## git status

作用：查看暂存区状态文件的状态。是新增、删除、还是修改状态。

```plain
git status
```

清屏命令：`git clear`或快捷键`ctrl + L`

## git commit

作用：把暂存区中的文件提交到本地仓库中

```plain
git commit -m '备注信息'git
```

**提交时注意事项：**

对于之前已经提交过本地仓库中的文件(即已经被跟踪过的)，再次提交时，中间可以省略 add 指令

```plain
git commit -am '备注信息' #add和commit连写
```

`-m`  选项指定了一条将会存储在标签中的信息。 如果没有指定一条信息，Git 会启动 vim 编辑器要求你输入信息 ,输入字母`i`进行编辑， 编辑完后，按下 esc,保存并退出 vim 编辑器`:wq`,强制退出`!wq`

> 注：git 默认不能提交空文件夹，仅能跟踪文件的变化。若要提交空文件夹，则需要在里面创建一个.gitkeep 文件方可提交

## git log

作用：查看提交的日志信息

```plain
git log
或
git log --oneline
更酷的图形化显示方式（含分支的信息）：
git log --oneline --graph
```

操作如下：



HEAD 是指向前当前分支中最后一次提交的引用。

> 注意：使用 git log 查看日志时，若日志信息过多，窗口显示不下时候，最后一行会有：号，我们只要输入:q 即可退出日志的查看。
>
> 如果不小心按住了其他键，则重新输入`:q` 退出即可。

## git log 和 git reflog 的区别

-   git log：显示所有提交过的版本信息
-   git reflog：可以查看所有分支的所有操作记录，包含删除，回退都会被记录。 比`git log`更详细。

## git reset 版本回退

reset 作用：实现提交后版本回退

使用`git relog`或`git log` 获取版本日志的前 7 位,可以回滚到指定的版本

```plain
git reset --hard af4542g
```

## git 提交空文件夹

> 注：git 默认不能提交空文件夹，仅能跟踪文件的变化。若要提交空文件夹，则需要在里面创建一个.gitkeep 文件方可提交

## git rm

创建文件：

```plain
touch 文件名1 文件名2 # 创建多个用空格隔开
```

```plain
git rm filename # 删除某个文件（只能删除已经被跟踪的文件）
若要直接删： rm filename
```

## git checkout

```plain
git checkout index.js  # 撤销index.js文件的修改操作
git checkout .  # 撤销所有文件的修改操作
```

## git alias

git alias： 设置命令的别名。若 git 带有较多参数的时候，可以使用 alias 设置别名的简化操作。

```plain
git config --global alias.别名 "命令全称"
```

如给 log 命令设置别名为 lg:

```plain
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
```

可查看提交的信息、日期时间、附注信息、作者

效果如下：  


删除别名：

```plain
git config --global --unset alias.别名
```

# github 中创建远程仓库

点击加号+，选择 New repository 新建仓库  


码云中创建仓库同理！

## git push 推送

git push 作用：用于将本地仓库代码推送到远程仓库。

之前的 commit 提交都将代码提交到本地仓库，而需要把代码分享给另外一个协同者，需要推送到远程仓库。

-   步骤 1：将本地仓库与远程仓库地址进行关联：

```plain
git remote add origin 仓库地址 	#设置本地的远程仓库地址，其中origin是远程服务器名称，
git remote rm origin		#移除本地远程仓库地址origin
git remote  -v       		#查看本地关联的远程仓库地址
```

-   步骤 2：推送代码：

```plain
git push -u 远程名称 本地分支名:远程分支名
```

如：将本地的 master 分支推送到 origin 主机的 master 分支，命令可以这么写：

```plain
git push -u origin master:master
# 当本地与远程分支一样，可简写
git push -u origin master
```

如果当前分支与多个远程主机存在追踪关系,一般下情况下，第一次推送加`-u`，可记住远程主机名，后面可直接通过`git push`推送即可。

> 注意：git push 推送时候会要求你输入用户名和密码，你也可以选择记住密码，后面就无须输入

清除 git 缓存中的用户名的密码:

```plain
git credential-manager uninstall
```

## push 代码到 github 遇到的问题

推送到 github 遇到的问题及解决办法！

解决端口 OpenSSL SSL_read 或 443 等网络相关错误

如果遇到以下问题：

> Failed to connect to github.com port 443:connection timed out
>
> 或
>
> OpenSSL SSL_read: Connection was reset, errno 10054

解决办法取消代理即可：

方式 1：取消（ctrl +c）,多试几遍

方式 2：取消代理，如下

> git config --global --unset http.proxy  
> git config --global --unset https.proxy

# clone 克隆远程仓库代码

克隆远程的仓库代码到指定目录:

```plain
git clone url  [目录名]
```

> 注意：不写本地目录名称默认会在当前目录创建一个与远程仓库同名的目录

## 拉取远程仓库代码

git pull 作用：拉取远程仓库中的代码到本地仓库中。

```plain
git pull 远程主机名 远程分支:本地分支
```

> 注意，分支 push 推送顺序的写法是`<本地分支>:<远程分支>`，而 pull 拉取是`<远程分支>:<本地分支>`，他们是相反的

## 拉取和获取的区别

```plain
git pull origin master # 拉取 远程仓库代码并合并到本地master分支
git fetch origin master # 获取 远程仓库代码不会合并，需要执行 git merge  进行合并
```

> git pull （拉取）= git fetch（获取） +git merge

# 解决开发中冲突问题

如果多人开发同一个模块，难免会修改同一个文件相同行代码！后者推送代码时候，则会提示有文件冲突（`conflict`）！导致推送失败！

命令行终端会提示：`![rejected]`  ，意思是拒绝。

解决办法：先拉取(git pull)最新代码，和同事商量怎么解决，修复之后然后再次重新提交推送！

> 拉取下来的时候，千万不要直接删除别人的代码！！！一定要沟通！！

# 创建.gitignore 忽略文件

有些文件或目录如果我们只是在项目本地用到，或者这些文件/目录是自动生成的，并不想上传到远程仓库，

我们可以在仓库目录中创建`.gitignore`文件，进行忽略规则的编写。

作用：用于忽略某个文件或目录

> 必须.git 隐藏文件夹在同一目录

示例：创建.gitignore 文件，忽略 node_modules 和 dist 目录，忽略.DS_Store 文件，此文件是苹果 mac 电脑自动生成的。没啥用

```plain
node_modules/
dist/
.DS_Store
```

查看各语言忽略文件的参考：[https://github.com/github/gitignore](https://github.com/github/gitignore)

# 项目说明文档

仓库中创建一个名为 readme.md 文件

通过此文件，可以让别人快速的了解该项目，相当于项目的使用说明文档。

> readme.md 需要和.git 放在同一级目录

# commit 提交日志规范

Commit message 格式：

```plain
<type>: <subject>
git commit -m 'feat: 登录功能'
git commit -m 'fix: 修复上传文件相关漏洞'
```

注意冒号后面有空格。

type：用于说明 commit 的类别，只允许使用下面 7 个标识。  
subject：是 commit 目的的简短描述，不超过 50 个字符，且结尾不加句号（.）。  
提交类型 type 有如下常见的值：

-   feat：新功能（feature）
-   fix：修补 bug
-   docs：文档（documentation）
-   style： 格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：增加测试
-   chore / build：构建过程或辅助工具的变动

# 创建标签（版本号）

Git 可以给仓库历史中的某一个提交打上标签，以示重要。 一般我们会使用这个功能来标记发布的代码版本（ `v1.0.0` 、 `v2.0.0`  等等）

查看仓库已有的标签

```plain
git tag
```

创建标签

```plain
git tag v1.0.0  -m '完成注册'   -m '完成订单'
```

默认情况下，`git push`  命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。

```plain
git push origin v1.0.0
```

推送本地的所有标签到远程仓库

```plain
git push origin --tags
```

要删除掉你本地仓库上的标签

```plain
 git tag -d v1.0.0
```

删除远程标签

```plain
git push origin --delete v1.0.0
```

# 设置 ssh 协议免密提交

ssh 是一种客户端和服务器之间的安全连接协议。

仓库地址有两种协议：https、ssh。

如果仓库地址使用 https 的协议，每次提交都会要求输入远程仓库 github 的用户名和密码，

配置 ssh 协议可以免去每次推送代码输入密码的烦恼。

配置步骤：

1. 创建 ssh 公钥和私钥。
2. 把仓库的地址协议改为 ssh 协议

**1. 创建 ssh 私钥和公钥：**

终端输入: ssh-keygen ，然后一路回车即可，成功之后会在当前用户的目录多出如下的两个文件。



-   id.rsa:私钥文件
-   id_rsa.pub:公钥文件  
    公钥：理解为锁,上传到 github 中存放着。  
    私钥：理解为锁的钥匙，在本地电脑存放着。  
    也就是说只有锁的对应钥匙才可以进行提交代码。

把 id_rsa.pub 的公钥文件内容复制到 github 指定位置，步骤如下：

找到右上角用户头像下面的设置 settings,在找到 SSH 一项，点击 New SSH Key，把公钥输入文本框中即可：


输入以下指令,测试 ssh 是否配置成功：

```plain
ssh -T  git@github.com #针对github
ssh -T  git@gitee.com #针对码云
```

提示有 You've successfully authenticated 字样 ssh 配置成功。

若是码云仓库也是同理：用户在个人 settings->ssh 公钥 中进行添加。

2. **配置仓库地址为 ssh 地址协议**

先删除原地址，在添加 ssh 协议地址

```plain
git remote rm origin
git remote add origin ssh地址
```

修改代码，再次 push 推送测试！

# git 分支操作

## 为什么需要分支

分支的优点：

-   开发独立功能，不影响其他功能。意味着程序员能把自己的工作从开发主线上剥离出来，开发独立功能的时候不会影响主线分支功能,更加高效。
-   bug 修复。当发现线上运行的项目有 bug 时，只需要在开一个分支进行修复，bug 修复完毕，再合并到主线分支即可，这样就不会影响线上原有功能。
-   ....

**认识 master（main）主分支：**

-   master 分支：这是每个仓库默认都有的分支，一般叫主分支。主要用来发布代码正式版本的,master 一般是可以直接发布在生产环境中，master 分支要确保稳定性。
-   正常开发下，是不可以在 master 下直接写代码的

## GitFlow 工作流

GitFlow 是团队开发的一种最佳实践，将代码划分为以下几个常用分支

**master（main）主分支：**

-   上面只保存正式发布的版本。一般是不建议在此分支中开发

**devlop 开发分支：**

-   从 master 分支中分出来的，后续开发人员主要在此分支下进行开发。
-   开发完成后，最终都要 dev 分支代码合并到 master 主分支。

**feature 功能分支：**

-   为了开发某种特定功能，从 develop 分支上面分出来的功能分支的名字
-   可以采用 feature-\* (分支功能/分支名)的形式命名。如支付功能分支： feature-pay

**修补 bug 分支 (fixbug)：**

-   软件正式发布以后，难免会出现 bug。这时就需要创建一个分支，进行 bug 修补。修补 bug 分支是从 master 分支上面分出来的。修补结束以后，再合并进 master 和 dev 分支
-   它的命名，可以采用 fixbug-\*的形式。如修复支付功能：fixbug-pay

## 分支相关操作

-   查看仓库所有的分支:

git branch

-   创建 dev 分支，并切换到 dev

```plain
git branch dev
git checkout dev
或简写
git checkout -b dev
```

-   删除分支 dev:

git branch -d dev

-   强制删除:

git branch -D dev

-   推送 dev 分支到远程仓库

git push origin dev

-   删除远程的 dev 分支

```plain
git push  origin --delete dev
```

-   合并分支代码。如将 dev 分支合并到 master 主分支。  
    步骤：1 先切换到要合并的分支，2. 再把 dev 分支合并到当前分支

```plain
git checkout  master
git merge  --no-f  dev  -m  '合并的信息'
```

> 注：合并分支建议添加选项--no-f，这样合并也算一次提交，这样可以让分支线图谱更加清晰。
>
> 合并的时候也可能会发生冲突，需要先解决冲突在操作。

**加不加--no-f 的区别：**

如图：  


-   添加 `--no-f`   选项可以保存你之前的分支历史。能够更好的查看 merge 合并历史，以及 branch 状态。

## 获取远程分支代码

分两种情况：

1.  第一种情况：若远程仓库已存在本地，则直接 pull 拉取即可。

```plain
git pull origin dev # 拉取远程dev分支合并到本地
git checkout dev # 可以切换到远程dev分支中继续开发工作
```

2.  第二种情况，本地没有远程仓库，则先克隆 clone，在 pull 拉取。 克隆的仓库默认仅有 master 分支

```plain
git clone 仓库地址
git pull origin dev # 拉取远程（origin）中的dev分支
git checkout dev	# 可以切换到远程dev分支中继续开发工作
```

# github 相关功能说明

-   fork 克隆操作：可以把别人的项目 fork（理解为复制）到自己的用户名下面
-   issue：给项目提问题建议，这样一个开源项目就会变得越来越完善健壮。
-   pull request: 。如果一个开源项目有 bug，你可以帮他修复完善。就需要发一个 pr 请求。 - 发一个 pr 请求步骤： 1. fork 下来 ，克隆到本地进行修改并提交。 2. 点击 pull request 即可 3. 项目原作者会收到 pr 请求，如果没问题，项目作者会把此请求合并 merge 合并到项目中。  
    合并成功之后，你就是这个开源项目的贡献者了！，面试时候是个亮点

# github 使用技巧分享

1. **github 代码搜索技巧**

如：github 输入框中，找出点赞数超过 100，且名字含有 vue 字样仓库的。

```plain
vue stars:>100
```

如：在后缀名为`.js`的文件，找出 getBoundClientRect 的使用。这种特别是在查找 api 如何使用时特别有用。

```plain
getBoundClientRect filename:*.js
```

找使用用 js 写的放大镜相关的项目,

```plain
zoom language:js
```

找使用用 js 写的放大镜相关的项目,且仓库点赞数超过 2000（2k）

```plain
zoom language:js stars:>2000
```

参考：[https://github.com/search/advanced](https://github.com/search/advanced) ： 表单可视化形式，可生成高级查询条件

**2. 看仓库源代码技巧**

进入 github 某个仓库，直接输入字符`.`即可打开在线版的 vscode 查看源码，非常方便。

> 前提要登录 github
