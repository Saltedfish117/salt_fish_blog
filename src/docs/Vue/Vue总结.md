## Vue中的生命周期:
            + vue2与vue3相同的生命周期:
                - beforecreate:
                    * 此时vue实例化初始化将将完成,但并未做数据初始化,数据观测,因此无法访问data数据,也无法调用methods的方法
                - created:
                    * 此时Vue已经完成数据初始化,此时我们可以访问到data数据,并且可以调用到methods里的方法
                - beforeMounte:
                    * 此时Vue已经完成模板编译,虚拟DOM已经创建完成,但并未挂载
                - mounted:
                    * 此时Vue已经根据虚拟节点创建完成真实DOM,并挂载到页面上,此时我们可以进行DOM操作
                - beforeUpdate:
                    * 此时响应式数据刚完成更新,但DOM并没更新,randeWacther并没执行.
                - updated:
                    * 此时数据,与视图均完成更新
            + 不同:
                - vue2
                    * beforeDestroy
                        + 实例即将销毁,但此时仍可以获取实例,实例属性方法仍然能够访问,但意义不大,我们通常在这做一些收尾工作.
                    * destoryed
                        + 实例销毁完毕,此时无法访问到实例
                - vue3
                    * beforeUnMount
                        + 实例即将销毁,但此时仍可以获取实例,实例属性方法仍然能够访问,但意义不大,我们通常在这做一些收尾工作.
                    * unMounted
                        + 实例即将销毁,但此时仍可以获取实例,实例属性方法仍然能够访问,但意义不大,我们通常在这做一些收尾工作.

![](https://cdn.nlark.com/yuque/0/2023/png/35708888/1692094759892-27cc8eeb-b57e-4cc8-b149-c0e8adbd67d7.png)

## new Vue()做了什么:
            + new Vue之前:
                - 给原型添加如$set,$nextTick,$delete,$on等方法,
                - 给Vue添加set,delete,nextTick方法
                1. 调用beforeCreated钩子
                2. 调用一个initState函数
                    1. 该函数会对
                        1. initProps:对props进行数据代理
                        2. methods:对methods,使用bind指定this,进行数据代理
                        3. data:对data数据代理,数据劫持
                        4. computed:生成computedWatcher(ditey:true,user:false)
                        5. watch:创建userWatcher(user:true,ditey:false)
                3. 调用created生命钩子
                4. 调用$mount,
                    1. 在内部调用beforeMount()
                    2. 会调用mountComponent(),只会调用一次
                        1. 创建updateComponent函数
                        2. 创建renderWatcher,将updateComponent当作回调传入renderWatcher
                    3. 调用renderWatcher
                        1. 调用updateComponents,
                            1. 调用render:
                                1. 编译模板的时候,读取data属性值
                                2. 读取computed属性,computedWatch属性,初始为ditey为true,调用回调访问到data数据,
                                3. data数据的get内部劫持到后,收集依赖
                            2. 调用patch()
                                1. 初始时: 根据虚拟DOM编译真实DOM/新旧
                                2. 更新时: 虚拟DOM差异化对比
                5. 调用mounted钩子

## Diff算法
            + 新旧虚拟DOM差异化对比,最小化更新真实DOM
            + 减少性能消耗,做最小的查找比较.
        * 流程
            + 同层DOM对比,比较新旧虚拟DOM的key和tag
            + 相同复用
            + 有新就创建
            + 多出旧的就删除
        * 子虚拟DOM比较
            + 经过四个判断:
                - 新前对旧前
                - 新后对旧后
                - 新前对旧后
                - 新后对旧前
            + 四个判断不通过:
                - 创建一个比较后剩余所有key和旧虚拟DOM的Map容器
                - 根据新虚拟DOM的key进行查找,找到就复用,没有就创建

## Vue响应式原理:
vue实现响应式主要是依赖了

Object的defineProperty来对数据进行劫持

还有就是一个(订阅,发布者)模式

原理:

                - 在vue初始化时,
                    * 会调用一个observe函数递归遍历data的所有属性,用defineProerty加上get,set方法,来感知数据的变化
                    * 在get方法里,用dep的收集watcher
                    * 在set方法里面,使用dep.notify来派发更新
                    * 然后会根据computed,watch对象内的属性,创建对应多个computedWatch,userWatch()
                - 在调用$mount函数中创建renderWatch()
                - 因为watch属性会根据data属性来访问值,因此它会被dep最先收集到依赖数组中
                - 之后在randerwatch初始执行时
                    * ,调用rander函数解析模板,访问到data属性,被dep收集进依赖数组中.
                    * 且rander函数可能会访问到computed属性值,因此	computedWatch会根据自身的dirty是否为true还是false,来判断是否执行回调,在初始化时dirty默认为true,所有它会直接执行回调,回调内访问了data属性,因此也被dep收集到依赖
                - 在更新阶段
                    * 数据一更新:
                        + dep会调用notify函数,启动nextTick异步任务,将所有依赖回调放入自身管理的队列,在启动的异步任务,统一处理更新.

## nextTick原理:
指定回调,在更新DOM后立即执行,

            + **原理**:
                - 在DOM更新中,因为DOM更新是异步,且也是通过nextTick实现
                    * 在nixtTick内部有个callbacks数组,里面保存的是传入进来的,需要异步执行的函数
                    * 在数据更新时,dep会派发更新,并且会将依赖其的watcher放入queue队列,并调用nextTick函数,将flushQueue函数当作回调传入
                    * flushqueue函数会依次取出queue队列的watcher回调依次执行.
                    * nextTick被启动后,会进行浏览器兼容判断,优先选择微任务,其次考虑宏任务
                    * nextTick会使用一个flushCallback函数,在异步任务中,遍历取出callbacks数组的回调依次执行.
                - 因此在数据更新后,我们立即调用nextTick传入回调,则会排在flushqueue函数后面,也就能拿到最新DOM
            + <font style="color:rgba(0, 0, 0, 0.8);background-color:rgb(248, 248, 248);">nextTick</font><font style="color:rgba(0, 0, 0, 0.8);background-color:rgb(248, 248, 248);">是一个在Vue.js中非常重要的方法。该方法的主要作用是将回调延迟到下次DOM更新循环之后执行。这在你想要在DOM可能发生改变之后立即操作DOM时非常有用。</font>

> Vue.js的DOM更新是异步进行的。只要监听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue刷新队列并执行实际（已去重的）工作。  
Vue在内部尝试对异步队列使用原生的Promise.then、MutationObserver和setImmediate，如果执行环境不支持，则会采用setTimeout(fn, 0)代替。  
nextTick方法就是利用这些机制，让我们可以在DOM更新完成后立即进行某些操作。例如，你可能在Vue生命周期的mounted方法中，需要操作一些已经渲染完成的DOM，这时候就可以使用Vue.nextTick()来保证操作的DOM元素已经更新完毕。
>

## keep-alive原理:
+ 作用:
    - keep-alive用于缓存组件,避免多次创建组件
    - 减少性能消耗,页面切换加快展示.
+ 原理:
    - 在初始化时,会创建两个容器
        * cache
        * keys
    - 在render编译阶段:
        * 获取默认插槽的vnode(虚拟DOM)
        * 根据include/exclude来判断组件是否需要缓存,如果不需要,就直接返回vnode
        * 如果有缓存:
            + 取出缓存的实例,直接保存到vnode里面,避免再次创建实例
            + 删除keys数组里的key,然后再把key,push到数组最后一位
        * 无缓存:
            + 将vnode临时保存进组件对象中
    - 在mounted/update阶段
        * 如果有需要缓存的组件
            + 将当前vnode的组件实例对象已key为属性,组件对象为值,缓存到一个对象容器中,
            + 然后再把key保存在一个名为keys的数组容器最右边
            + 判断是否超过max属性值
                - 如果超过
                    * 利用LRU算法,找出最少调用的组件,将其key从keys数组删除,并删除在对象容器中的组件实例
                - 没有超过:
                    * 正常缓存

## vue3的响应式原理:
+ **vue3与vue2不相同**:
        * 在vue2中响应式是通过:
            + defineproperty做数据劫持
            + 用dep,watcher实现收集依赖,派发更新
        * 在vue3中的响应式是通过:
            + proxy完成数据劫持:
            + 利用effect副作用函数来做更新
+ **在vue3的响应式中:**
    - vue会通过两个函数对数据初始化:
        * ref
            + 生成一个具有get value和set value方法的对象
        * reactive
            + 用proxy生成一个代理对象
        * 它们都可以感知我们对属性的获取,修改
        * 跟vue2一样
            + 会在数据被获取时收集依赖
            + 在修改数据时派发更新
        * 在数据被更新时
            + vue3,内部有着一个effect缓存容器
                - 它的结构是:weakmap=>map=>set
                - 内层set是存储依赖该属性的所有effect函数
                - 中间的map则是以属性名为key,存放着set,它是包含一个对象内所有属性的effect函数的容器
                - 最外层的weakmap是以对象为key,值是包含这个对对象所有属性的effect函数的map对象
            + get的时候通过track函数
                - 根据指定的target和key,从effect缓存容器取出对象的set容器
                - 把依赖该属性的effect函数存入set容器中
            + 那么在更新的时候,就会通过trigger函数
                - 根据指定的target和key,取出缓存容器里的set集合
                - 然后启动nextTick,在异步中遍历执行该集合的所有effect函数.



