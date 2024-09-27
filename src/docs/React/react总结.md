# React
## react类组件生命周期
            + **组件挂载阶段**
                - constructor
                    * 使用super继承父R类
                    * 初始化state
                    * 修成事件处理函数this
                - getDerivedStateFromProps
                    * 
                - rander
                    * 编译模板，返回真实DOM
                - componentDidMount
                    * 组件挂载后立即调用
                    * 操作DOM
                    * 发送请求
                    * 添加订阅
            + **组件更新阶段**
                - shouldComponentUpdate
                    * 组件即将更新
                    * 可阻止组件更新，重新渲染
                - componentDidUpdate
                    * 组件更新完毕
                - componentWillUnmount
                    * 组件即将卸载
                    * 清除定时器
                    * 取消订阅
            + **捕获后代组件错误**
                - componentDidCatch
                    * 接收后代组件抛出的错误

## react组件通讯方式：
props：父向子通讯。

props回调：子向父通讯。

context：跨级传递，爷孙通讯

redux/modx：全局状态共享。

## reactHook
Hook，钩子，是react后期实现的，在react早期是没有hooks的，早期函数组件是无法定义以及维护state，并不是主流开发模式，后期实现了react-Hooks后就成为了react的主流开发模式。

相较于类组件，函数组件的解耦性，可复用性更强，且更灵活，强大。

### react常用Hook：
**useState**：

                    * 给予了函数组件定义与维护状态的能力。
                        + 返回是一个数组，用于我们解构赋值。
                            - 为何不能是对象？
                                * 给予开发者对元素命名能力，降低使用复杂度。
                                * 对象无法实现。

**useEffect**：

给予函数组件模拟生命周期的能力。

无返回值。接收两个参数。

第一个参数：回调

用于模拟挂载与更新

返回值：回调

用于模拟卸载生命周期

第二个参数：依赖数组

在useEffect回调中使用的所有外部参数都需要写入数组中，

只要依赖数组中的参数变化，useEffect回调就会执行，可做类似监视操作。

不写入依赖：

只会模拟挂载阶段执行

不传第二参数：

所有更新阶段都会执行。

**useContext**：

react跨级传递手段：

接收父级provider传递的值

需传入context对象。

**useRef**：

创建ref对象：

react获取refDOM实例手段

相当于一个容器，可保存数据

### react常用优化手段
                    * **useCallback**：
                            - 因为react组件每次更新，都会将函数执行一遍，因此在函数内部声明的函数，会重复声明。
                            - 缓存函数，避免重复声明
                    * **useMemo**：
                        + react缓存需大量计算的结果，可理解为vue中computed属性。
                        + 避免重复计算，减少性能消耗。
                    * **useTransition**：
                        + 将状态更新标记为不紧急。
                        + 在部分不重要state更新
                    * **useDeferredValue：**
                        + 推迟DOM树更新。
                    * **React.memo**:
                        + 等价于类组件的PureComponent，浅比较Props

## react受控组件与非受控组件
受控组件：

在react中需要用户输入的组件想要采集用户输入内容，都需要绑定onChange事件，只要表单变化就会触发，从而收集数据，更新界面因此被称为受控组件。

非受控组件：

如果组件没有value和props就可以称为非受控组件，通过ref来从DOM获得数据，也就是所有数据都没有我们亲自收集的。

## react事件机制：
在react中，我们绑定的事件处理函数拿到的事件对象并不是原生的DOM事件对象，而是仅由react包装过的合成事件对象。

### react独特的收集事件方式：
            + react会在**根节点**（document）**监听所有事件**，我们触发事件是冒泡到document处，然后react将事件封装然后交由我们的事件处理函数。

## ![](https://cdn.nlark.com/yuque/0/2023/png/35708888/1693010573103-32bb8c61-8ca1-4716-9642-fd32943b8ec7.png)
            + 合成事件的好处：
                - 抹平了浏览器的兼容性。
                - 减少了原先模式绑定大量事件所造成的大额内存分配。
            + 合成事件与原生事件的区别：
                - react采取小驼峰命名。
                - react事件不能采取return，false方式来阻止浏览器的默认行文，必须调用preventDefault（）方式来阻止。
        * react对合成事件的处理：
            + react内部有一个事件池管理合成事件的创建和销毁，避免频繁的新增与删除（垃圾回收）。
        * react对合成事件干的事：
            + 事件委派：react会在document处监听所有事件，统一封装冒泡上来的事件对象，然后进行分发。
            + 自动绑定：react组件中，每个方法的上下文都会指向该组件的实例。

## React高阶组件：
### 高阶组件的特点：
接收一个组件作为参数，返回一个新组件。

### HOC的优缺点：
        * 优点：逻辑复用，不影响被包裹组件的内部逻辑。
        * 缺点：仅由hoc传递的props可能被覆盖。

### 应用场景：
        * 权限控制：
            + 利用条件渲染特性对页面进行权限控制。
        * 组件渲染性能追踪：
            + 借助父组件子组件生命周期规则捕获子组件的生命周期，对某个组件的渲染事件进行记录。
        * 多个组件共用同一个状态：
            + 接收一个组件作为参数，返回一个新组件，组件内部维护状态，使用props转递参数。

## react中的PureComponent以及Component的区别：
主要说PureComponent的特点就好。

PureComponent：

表示一个纯组件，其内部会对传入的props、state进行新旧浅比较，来判断是否重写渲染，可优化react程序性能。



## **react重新渲染时机：**
调用setState：

        * 特殊调用setState并不会触发更新，调用setState时传入null并不会触发render更新。

父组件重新渲染：

在react中只要父组件触发渲染，其所有子组件都会重新渲染。

想要避免：

            + 对子组件使用PureComponent。
            + 使用React.memo。
            + useMemo缓存。

## **react重新渲染干了什么：**
### 新旧vnode对比，Diff算法：
        * react的Diff算法：
            + 对新旧vnode深度遍历，对每个节点标记。
            + 每遍历一个节点，就把该节点和新vnode节点数对比，有差异就放入一个容器内。
            + 遍历差异容器，根据差异类型，对应的规则，进行vnode更新。

## react的Fragment：
在一个组件的jsx中有且只有一个根标签，在以往我们都会使用div来包裹jsx，但这会导致页面产生大量无用的div

React.Fragment组件可以代替div来实现跟根标签,其不会在页面渲染任何结构。

react的Portals：

Portals给予了我们更灵活的组件渲染位置方式，

它可以让我们组件渲染在我们任何想要渲染的位置

## react中的forwardRef：
其可以将组件的ref值传递到外部。

## react组件懒加载：
使用react提供的react.lazy方法通过import函数调用方式实现

## react中的Suspense:
给予我们在组件渲染过程中展示其他效果,如:加载中...

## useEffect与useLayoutEffect的区别:
同异步:

useEffect是异步执行的,在DOM更新之后.

useLayoutEffect是同步执行的,会在我们状态更新之后,DOM更新之前执行.

## react的setState的执行:
    - 异步:
        * 在react中多个state的更新,会在react能够控制的范围内(合成事件处理函数,生命周期处理函数)进行批量更新.更新完毕之后才进行DOM更新。
    - 同步：
        * 如果在原生javaScript的控制范围内（原生事件处理函数，定时器回调，ajax回调）被调用，它就是同步执行的也就是setState被调用后会立即进行DOM更新操作。

## react的Diff算法优化：
react对diff算法做了三个层面的优化：

        1. 同级元素对比。
        2. 两个不同类型的元素会产生不同的树，父元素的改变，react会直接销毁，然后创建新的。
        3. 通过key属性让子元素保持稳定。

## Diff算法详情
从新旧vnode树根节点逐层比较：

        * react对比过程中会对不同的结果，进行不同的处理
            + 节点元素/组件类型不相同
                - react会拆卸原有树并建立新树，子节点不再比较
            + 节点元素类型相同
                - react保留DOM节点，对比以及更新有改变的属性
                - 递归子节点继续对比。
            + 节点组件类型相同：
                - 保持实例不变，仅更新组件state、props，并触发部分生命周期，再render阶段会对新旧render结果递归对比。
            + 对子节点递归，使用key属性优化。

key属性的作用：

react在Diff算法中对于DOM子节点主要通过key属性来进行差异比较更新，稳定唯一的key属性可以有效帮助Diff算法的对比，避免复用错误DOM，实现最小化的DOM更新。

# React-Router
实现客户端渲染，开发单页面应用，跳转页面不刷新。

### 基本使用：
url模式

创建路由对象/路由表

createBrowserRouter

使用路由表

useRouter（路由对象）

BrowserRouter组件包裹根节点

hash模式

创建

createHashRouter

使用

useRouter

HashRouter

路由嵌套

Outlet组件：

嵌套路由渲染位置（可以理解为vue的Routerview）



### 路由跳转
声明式导航

NavLink

to属性：路由跳转路径

Link

to属性：路由跳转路径

编程式导航

useNavigate获得navigate对象

调用navigate（路径，参数）

### 路由传参
params路由传参

路径拼接

获取

```plain
// 在目标路由组件中接收
import { useParams } from 'react-router-dom'
// params 是一个对象,里面可以获取到路由参数具体的值
const params = useParams()
console.log(params) // {id:1}
```

query传参

路径拼接

获取：

```plain
const [query，setQuery]= useSearchParams()
query.get(key)
```

state（任何数据类型）：刷新页面数据丢失

传递

```jsx
<Link to="/目标路径" state={要传递数据}></Link>
<NavLink to="/目标路径" state={要传递数据}></NavLink>
navigate('/目标路径', {
 state: 要传递的数据
})
```

获取

```javascript
import { useLocaiton } from 'react-router-dom'
const location = useLocation()
location.state //可以获取到数据
```





