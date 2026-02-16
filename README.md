- [CSS/box/index.html](CSS/box/index.html)
    - macOS强制显示滚动条 [#2](https://github.com/ceilf6/Lab/issues/2)
    - 单行文本的省略空白处理 [#3](https://github.com/ceilf6/Lab/issues/3)

- [CSS/视觉格式化模型/常规文档流/外边距折叠.html](CSS/视觉格式化模型/常规文档流/外边距折叠.html)
    - 外边距折叠 [#4](https://github.com/ceilf6/Lab/issues/4)

- [CSS/视觉格式化模型/浮动/ex/css/common.css](CSS/视觉格式化模型/浮动/ex/css/common.css)
    - 分页器

- [CSS/视觉格式化模型/定位/二级菜单/css/2th.css](CSS/视觉格式化模型/定位/二级菜单/css/2th.css)
    - 32~ 元素的隐藏与显示，将 :hover 挂载到共同的父元素上
    - 79~ 二级菜单和上层之间衔接的 border 处理：伪元素遮挡

- [CSS/视觉格式化模型/定位/弹出层/css/popup.css](CSS/视觉格式化模型/定位/弹出层/css/popup.css)
    - 居中

- [HTML/表单元素/CSS美化/myRadio.css](HTML/表单元素/CSS美化/myRadio.css)
    - 自实现选择框

- [NodeJS/CMJ](NodeJS/CMJ)
    - .cjs 后缀会永远用 CJS
        - 会覆盖 package.json 中的 type: "module"
    - .mjs → 永远是 ES Module

- [Vue2/sandboxs](Vue2/sandboxs)
    - demo created from Vue/CLI

- [Vue2/sandboxs/src/utils/getComponentRootDom.js](Vue2/sandboxs/src/utils/getComponentRootDom.js)
    - 通过 render 以及 $el 获取某个组件渲染的Dom根元素

- [Vue2/sandboxs/src/utils/toast.js](Vue2/sandboxs/src/utils/toast.js)
    - 实现 toast 提示函数，通过 JS 创建提示框

- [Vue2/sandboxs/vue.config.js](Vue2/sandboxs/vue.config.js)
    - 通过开发服务器代理处理开发环境中的、浏览器同源策略导致的跨域问题

- [Vue2/sandboxs/src/mock/index.js](Vue2/sandboxs/src/mock/index.js)
    - 拦截 AJAX ，重新赋值 XHR 。 Apifox 和 Postman 也支持 mock 环境

- [Vue2/sandboxs/test/Lifecycle/timerDestroyed.vue](Vue2/sandboxs/test/Lifecycle/timerDestroyed.vue)
    - 类似于[组合关系](https://github.com/ceilf6/CPlusPlus/blob/main/docs/relationship_demo.cpp#L120)的析构函数，凡是在 mounted / created 中引入的“组件外部副作用”，都应该在 beforeDestroy 中对称清理
 
- vue2沙盒开发的一系列成果测试脚本 [link](https://github.com/ceilf6/Lab/blob/main/Vue2/sandboxs/package.json#L9)

- [Vue2/sandboxs/src/directives/loading/index.js](Vue2/sandboxs/src/directives/loading/index.js)
    - v-loading 自定义指令实现 Loading 态呈现

- auto update Action for README [link](https://github.com/ceilf6/Lab/commit/e8a2c1df8e6f2bca5610dbd4a8dbbc40f8a8d268)

- mixins 混入实现配置代码复用 [link](https://github.com/ceilf6/Lab/commit/a2423747951f26fca4f3949f09b48b93cbc7b458)
- 组件递归 实现 层级列表组件 TreeListMenu [link](https://github.com/ceilf6/Lab/commit/64afdb48013cd41985b79fd8fa12c4d4ae249b81)
- vue-router 动态路由匹配 通过 vue-router 注入的原型对象 $route 提供的路由信息 [link](https://github.com/ceilf6/Lab/commit/833dd96a83e4f8a40d467202550db889c737236f)
- React 自定义组件想要触发DOM事件，得传递到能响应的元素上 同时注意如果没有特殊处理，在事件处理函数中，this指向undefined 1. bind 2. () => [link](https://github.com/ceilf6/Lab/commit/929c449923abc5d1e658b62b07571fa4e44ae267)
- JS执行 - call stack 执行上下文中的 this 和 变量对象VO 虽然 ES6 后 const 和 let 不会污染对象，但是之前代码都用的 var 还是得了解 [link](https://github.com/ceilf6/Lab/commit/7509501150c9e476648fb3f61d77ff26cb6a6799)
- 当找不到某个属性时，执行上下文通过函数对象的隐藏属性 \[\[Environment\]\] (之前叫 \[\[scope\]\] )指针连接外层词法环境形成作用域链，然后往上寻找 => 即使 outer 执行完了，inner 仍然保留对 outer 变量的引用、导致GC失败 => 闭包 \[ => 内存泄漏风险 \] [link](https://github.com/ceilf6/Lab/commit/1dae95e5ea6a478353708e30340e91fac2b7e13a)
- CSRF danger example and 5 ways to solve [link](https://github.com/ceilf6/Lab/commit/3d687dd1827e287694ecd0bb5efbeef6265f0ef4)
- 如果setState改变状态的代码处于某个HTML元素的事件中，则其是异步的，否则是同步 如果要使用改变之后的状态，需要使用回调函数 如果新的状态要根据之前的状态链式作用，需要使用函数的方式改变状态 同时React会对异步的setState进行优化，将多次setState进行合并 [link](https://github.com/ceilf6/Lab/commit/d04fd3df98317da48d47380ab49ae44c4e042669)
- React 通过 props.children 实现 Vue 插槽功能 具名插槽区分 1. 直接传对象 2. 函数对象属性 3. 直接传递一个 render 函数 => ( JSX ) [link](https://github.com/ceilf6/Lab/commit/d719805fda688bb389a31ff3db44e65f7ab81fb3)
- 默认情况下，Form 对在里面的所有的 Input 都传递了 handleChange, 当其中一个变化时，直接修改了 Form 的 state, 那么整个 Form 、 Form 中所有的 Input 都会 re-rende 通过 useForm 内部管理的 _formValues 实现字段级别订阅更新、 _formState 表单整体状态的观察者模式 [link](https://github.com/ceilf6/Lab/commit/c856c39f9cbacee376616c6774c8e7fd567ba8f9)
- 以数组作为下标的影响: 数组变化后，相同位置的元素 key 相同，Vue 会认为是同一个元素，直接复用 DOM 但实际上数据已经变了，导致 DOM 和数据错位 特别是表单元素（input、select、textarea），它们的值存储在 DOM 节点上，不是响应式的，复用 DOM 后值就乱了，导致每次删除的都只可能是最后一个 [link](https://github.com/ceilf6/Lab/commit/a566dac46f44788660fcb7c369be272d59b10401)
- a 被 B 引用了，形成了闭包，B函数携带了 a 创建时的词法环境，所以其存储于堆内存中、不被回收（如果在栈内存上会导致需要引用的时候已经出栈了）；b 没有被引用，只会在 A 的执行上下文中、短暂的存在栈内存中，在 A 执行结束后变得不可达 [link](https://github.com/ceilf6/Lab/commit/55cf74ffe5e2468376021b0b6efddcc878ec721e)
- 父组件异步处理后返回子组件 1. emit 中回调函数，类似于 React 中父组件传递给子组件处理函数、提供权力子组件影响父组件的数据 2. 父组件返回Promise，子组件通过 .$listeners 拿到父组件的 handle 函数引用（但是 listener 是直接调用的函数，没有触发事件的上报） 3. 父组件直接 props 传下去处理函数，处理函数和 2 一样都是返回的 Promise [link](https://github.com/ceilf6/Lab/commit/cc063d8d86a63c6b6397662e2c9bff8ff68c770b)
- v-model + event-modifiers v-model 默认是 input 事件，在事件修饰符之后 v-model.lazy 是change 事件 开启 .number 修饰自动将事件value转为数字 [link](https://github.com/ceilf6/Lab/commit/761e9c704e8650a982d33e17bab0fbaf6fe02fb6)
- 手动实现观察者模式 => 事件总线 方便组件之间通信、组件和普通模块通信、事件处理 ( Vue 自带 $emit, $on, $off 实例成员，直接导出一个 Vue 实例都可以 ) [link](https://github.com/ceilf6/Lab/commit/965fd30b27e265aa759d8ba2e9794c18114213c9)
- 利用浏览器资源缓存，实现 v-lazy 自定义懒加载图片指令 其中滚轮视图事件通过事件总线管理，抽离出mixin统一上抛事件 [link](https://github.com/ceilf6/Lab/commit/2e70841c9483f1119901e7f9fd9a8093b7517310)
- [通过 vuex 进行共享数据管理 mutations 方法中不允许副作用操作 通过在 actions 中 dispatch 实现副作用操作](https://github.com/ceilf6/Lab/commit/bcadabcdf485eff395a109c814578c9aed4c0ed1)
- [通过 vuex 和 router 管理 登陆、注销 vuex. module 实现模块化 开启命名空间防止命名冲突 开启严格模式后，只允许通过 mutations 改变状态 getters 计算属性 mapState 简化命名空间相关代码 通过 template 逻辑容器处理同级元素](https://github.com/ceilf6/Lab/commit/5c77685db2f57937d161d20ac8152c08558d82a9)
- [使用 route 对 vuex 的登陆态进行路由守卫、鉴权拦截 在路由对象中带上目标页信息，方便在登录之后重定向、鉴权 添加 exact-path 防止路由中 hash 和 query 对样式匹配的影响](https://github.com/ceilf6/Lab/commit/290f01b2b9d7a15321b3823007e559d90d8babfc)
- [公共库体积优化 利用 tree-shaking 优化 Vuex 利用 CDN: 对 webpack 声明不要对公共库进行打包（私有的要收费） 通过模版代码在index中进行分流，否则开发环境也用CDN资源就无法使用Vue-dev 生产环境传统CDN导入会自动"污染"全局 --modern 开启现代模式打包](https://github.com/ceilf6/Lab/commit/475030a855b06fd49e0bb7943a4ec25a38c2d1a3)
- [项目包体积优化 利用webpack对动态import的支持实现页面分包](https://github.com/ceilf6/Lab/commit/a9ad2ba0c1c58f6e711b671919dd5ac814f5ef54)
- [通过 defaultImg 粗略优化首屏体验](https://github.com/ceilf6/Lab/commit/49857fe2ab326d9c7157f49ffe02776a4ea19441)
- [异步组件 + 进度条](https://github.com/ceilf6/Lab/commit/623b5b9a6d17c4e413af8fd240ac1e55ed64db61)
- [通过通配符 * 匹配 404 页面](https://github.com/ceilf6/Lab/commit/e60c6d9e1f16434cee4b9273c8b770601c97ebf4)
- [Vue3 较 2 的 diff 构造函数 this指向 组合内聚](https://github.com/ceilf6/Lab/commit/83edd69a89a8cff811c8a1c6986525f650280d15)
- [虽然 Vue2-mixins 能实现内聚，但是存在混合之间层次扁平化、执行顺序等问题 而 Vue3 composition 可以直接进行 函数级别的交互](https://github.com/ceilf6/Lab/commit/e8d98d705ca017baa9b5a4fd2f9621f1f363002c)
- [Vue3 将 LifeCycle Function 都抽离成普通函数了，不需要再限定在配置中](https://github.com/ceilf6/Lab/commit/2c36fc2ac27de4d135984f1b0572e9db3d41fa1b)
- [like LifeCycle, Vue3 has computed() func](https://github.com/ceilf6/Lab/commit/850b9924b43558f09cbe9736562b52293524ada6)
- [Vue2 中计算属性可以通过 set 影响原始数据 Vue3 的 computed 最佳设计只设置 get 视为是只读的快照](https://github.com/ceilf6/Lab/commit/421e1ac98192549ffcb2a017f1310f907209c39f)
- [template 预编译 => render() Vite 本地开发时直接请求、快于 webpack css => str vue => js](https://github.com/ceilf6/Lab/commit/51c2bd081b77f5da04db72f2c55f4eeaa2761d8f)
- [因为 Vite 利用的是“现代浏览器支持ESM”这一特性，在开发时将模块文件直接传输给浏览器，不需要打包，是实时编译 所以 CMJ 是不支持的](https://github.com/ceilf6/Lab/commit/cb2fdc3c61d2a04a1274a48d0e26a436b30aab30)
- [vue3 运行时缓存机制 vnode 存储到 _cache 中进行复用](https://github.com/ceilf6/Lab/commit/c94020e4e64cc67d33e5a87daf9266dda3536412)
- [Vue3 不会对静态节点反复创建渲染函数，而是上提、然后在render中重复使用](https://github.com/ceilf6/Lab/commit/4739a9fe8e1604dd5900b018e5ee20b2976bc821)
- [Vue3 预字符串化](https://github.com/ceilf6/Lab/commit/824ff9a8c1a4abf9790fcc743df5597616f15415)
- [Vue3 打标是动态节点还是静态节点 如图是动态](https://github.com/ceilf6/Lab/commit/21ad93653369b624afb3145b8033429902331b01)
- [Vue3 中属性的静动态打标区分](https://github.com/ceilf6/Lab/commit/d641f1daee8ef981c8e4d069c111b0c79416d7ea)
- [Vue3 双向绑定 v-model :modelValue , @update:modelValue v-model修饰符](https://github.com/ceilf6/Lab/commit/766830c8aa1a052e97ad2b6956f4188caf95f0ce)
- [虽然 Vue2 v-for > v-if ，但是每次变更后都需要重新循环判断 Vue3直接交换了优先级、报错[vue/no-use-v-if-with-v-for] 正确应该通过计算属性进行判断 当使用<template>进行v-for循环时，需要把key值放到<template>中，而不是它的子元素中](https://github.com/ceilf6/Lab/commit/0fd235a7780f81c54d9ef82eb31fa329ac114c02)
- [当使用`v-if v-else-if v-else`分支的时候，不再需要像Vue2一样指定`key`值（否则可能数据没清空) vue3会自动给予每个分支一个唯一的key 即便要手工给予key值，也必须给予每个分支唯一的key，不能因为要重用分支而给予相同的key，否则就无法切换了（Block了、编译成静态节点了）](https://github.com/ceilf6/Lab/commit/f61c7eb9f6087d7de40360596ee860757a433b79)
- [Vue3 的 router](https://github.com/ceilf6/Lab/commit/913c49bc82d57738a51182aca6e61136fedcac66)
- [Vue3 异步加载组件](https://github.com/ceilf6/Lab/commit/26d8f16016337bb123efb9c240652efad093c913)
- [通过配置 defineAsyncComponent 对象设置 loading 和 error, Vue3 的 util syncGetComp 比 Vue2的 多等待和错误状态 Vue3 h函数具名了，方便随时创建虚拟节点](https://github.com/ceilf6/Lab/commit/dc5f60bd3314dbeda794008915c6928807f1eafb)
- [异步加载页面（本质就是异步加载组件）](https://github.com/ceilf6/Lab/commit/af1bc8ac862a196a3be1a9f4eba292de4d8e1407)
- [朦层 通过 Teleport 修改在真实DOM中的位置](https://github.com/ceilf6/Lab/commit/24c3744fa6b8b997c80c9d9f527349242ca34a77)
- [property-descriptor 属性描述符对象 设置 set/get => 存取器属性“Invoke property getter”: 不再是在内存中管理 obj.a ，而是类似于 直接运行get()和set(val) 预检 通过innerText => UI和数据双向绑定](https://github.com/ceilf6/Lab/commit/4bbf99a0344b1c1bdbe93e597895211b0d719cc7)
- [ES6 => Reflect => 函数式编程、JS底层能力API](https://github.com/ceilf6/Lab/commit/19d0ecd467ecac47565c7aa47c0990b6cab7a9d7)
- [可以通过 proxy 在 Reflect 的底层实现基础上做想做的](https://github.com/ceilf6/Lab/commit/030ed37fc99142ab4e611f3ad3523df2daa3514a)
- [通过 Object.defineProperty 实现浅层观察者模式 设置了两个对象，无法时时刻刻保证两个对象一致性（所以 vue2 有 $set 和 $delete 用于在 mounted 之后的属性更改）](https://github.com/ceilf6/Lab/commit/588438566d7879136ed778924e109578576da21f)
- [递归实现深层观察者模式](https://github.com/ceilf6/Lab/commit/5ee0c12a0109eb9b2a6e0c764225a539d0dc2c38)
- [虽然 defineProperty 可以直接通过覆盖 target 来避免 ob 的创建，但是会导致污染原先对象 最佳实践还是 Proxy](https://github.com/ceilf6/Lab/commit/89778f849e4ef2d1ddeba52822634cb8b3fd72d2)
- [类代理，自动进行任何构造函数属性赋值](https://github.com/ceilf6/Lab/commit/22108b52f6a73efab0d37f9af977134c23a9fd2a)
- [通过代理校验实现类似TS的JS](https://github.com/ceilf6/Lab/commit/891e300778eecdbd87b4b8661e80e8f4837f3834)

- [#7](https://github.com/ceilf6/Lab/discussions/7)
    - reactive ⇒ proxy实例
    - readonly ⇒ 返回了新的 proxy 实例，set 和 deleteProperty 做了特殊处理
    - ref 可以代理任何数据类型，封装到一个对象 value 属性上
        1. 原始数据类型 ⇒ ES6的 get value() 和 set value() 本质就是 Object.defineProperty 存取器属性
对象用 Proxy 是为了动态的无感监听，但是原始数据类型直接用一个 对象 包裹后只需要管理一个属性 value 即可，不需要动态代理所有属性
        2. 对象 ⇒ 使用 reactive
        3. proxy实例 ⇒ 直接用该代理
    - computed 在监听对象改变后第一次会触发计算函数，后面都是用的缓存
    [link](https://github.com/ceilf6/Lab/commit/1c6f732a7cb6face6f9ba700979f17bc68bf5188)

- [readonly - 类似于 vuex 不允许外部直接更改数据，得调用暴露的API上报](https://github.com/ceilf6/Lab/commit/80296e75fe24adec324225579cce27d1ec00dc30)
- [防抖更改响应数据](https://github.com/ceilf6/Lab/commit/d67e7b90e14703b6725a84b6074d225bf47e7de9)
- [watchEffect 的执行是在微任务中回调，配合 stop 的三种情景的对比（有、没有、在宏任务中）](https://github.com/ceilf6/Lab/commit/c55d816eb1120926a632acc29c8ff49b1fa6922d)
- [watch使用场景 - **不希望回调函数一开始就执行** - 数据改变时，需要**参考旧值** - 需要**监控一些回调函数中不会用到的数据** 其余感觉用 watchEffect 更好](https://github.com/ceilf6/Lab/commit/b3e1286b3e9ff16b428efb93f7521c578860c0fd)
- [开发纪律规范 => 减少负担 - 最好所有 composition func 都返回的是 ref Obj unref === isRef(val) ? val.value : val](https://github.com/ceilf6/Lab/commit/a8584495812c10d38806ca4d0dc60ffb2ea18046)
- [Vue3生命周期 在 template ⇒ render 中渲染虚拟节点的时候会对响应式数据收集依赖 renderTracked 在收集到一个依赖就会触发一次](https://github.com/ceilf6/Lab/commit/f9f2bc522c475a5dde838ff16767561c49e917fb)
- [renderTriggered 在响应数据每变化一次就会触发一次 这两个生命周期钩子一般用于开发排查](https://github.com/ceilf6/Lab/commit/38c942363d279014cf0c55e545fdd8ec6bdb8c2d)
- [利用 live-server 启动的服务器 + 文件路径 => 访问本地资源模拟API请求](https://github.com/ceilf6/Lab/commit/20915a8d46f9374977affe5e4db02e774875f6f6)
- [利用 Vue3 的 reactive API 模拟 vuex 全局的响应式数据、对外暴露的是只读的以及API接口 接口兜底 闭包隐藏 userState](https://github.com/ceilf6/Lab/commit/09a4447ddbb3299d562eb3a531d1bcc86f0b3590)
- [React 旧版生命周期（仅类组件有）](https://github.com/ceilf6/Lab/commit/24c7bca885d22fa00b1574e40127489045518593)
- [React 新版生命周期（同理仅类组件用）](https://github.com/ceilf6/Lab/commit/44f9cb2b6c20b495f61594208b7558a6e0d10a57)
- [反模式 - 使用姿势不当 - componentWillReceiveProps 导致的数据来源不单一](https://github.com/ceilf6/Lab/commit/ca8871928f27cab436ea20a5111d284d3191eed3)
- [尝试使用新版 GDSFP 模拟上条反模式，会发现子组件自身属性完全变成了父组件状态的映像，因为每次更新组件都会调用 GDSFP 这个生命周期钩子、变成父组件状态 故而限制了数据来源单一](https://github.com/ceilf6/Lab/commit/e75777e61821a9088d72024b56e00efe7834bde2)
- [通过 name 属性区分实现单一 handleChange 管理整个表单 别忘记计算属性名](https://github.com/ceilf6/Lab/commit/b0bef7e92b3d2bf0ae982af3b3cbc42aa5f870b0)
- [React - defaultProps 混合assign](https://github.com/ceilf6/Lab/commit/18e8530f3cddf091e09d3260888d8cf0b4b46745)
- [TS 直接用 interface 编译期强制规定即可 老项目 JS 的话得用 prop-type 库 ，那么只能在运行时报错 链式调用添加一个 isRequired 函数进行检查](https://github.com/ceilf6/Lab/commit/5a09de9646cb077fa49b82b7ee0d83a28bbfcae4)
- [通过HOC高阶组件关注横切关注点实现日志记录、登录 别忘记下放props 还能在中间额外修饰等等、玩法很多](https://github.com/ceilf6/Lab/commit/efb94f04876edd8ce0f0781b9852a151bd292a74)
- [装饰器模式重构 - 抽象横向关注点、抽离重复渲染事情给 HOC，不用重复书写渲染](https://github.com/ceilf6/Lab/commit/56569ad627e3d34650861e3a5b63d56a0336bf4f)
- [通过 React.createRef() 创建 ref对象 通过 .current 拿到目标](https://github.com/ceilf6/Lab/commit/68ececb7f9d90eb84c92c3bde1c5fcad282c115e)
- [通过 ref 得到 (类似Vue) React HTML Element 真实 DOM 对象 类组件实例 调用方法](https://github.com/ceilf6/Lab/commit/0f28d78db750cfe4812f1524a7e94d70376be306)
- [通过 函数ref={el => this.txt = el;} 创建 ref 不再需要 .current 如果不是通过 外部的getRef 那么每次 render 都会重新创建一个新函数，函数会调用两次、旧的函数返回null 现代函数组件推荐使用 useRef() ref 这种直接操作的思想其实是和 React 背道相驰的](https://github.com/ceilf6/Lab/commit/039c17430c5409f185ab6bf49ee8469925144838)
- [forwardRef => 从函数组件中拿到目标的 ref 是高阶组件，拿到新组件后，在使用时声明了 ref ，那么就会作为第二个参数传入到forwardRef的入参函数组件A中](https://github.com/ceilf6/Lab/commit/7f9cd2d5e1b1ed187617cec8d5f9c92d8a0a6983)
- [forwardRef 不能直接用于类组件，直接用函数包装一下，然后通过属性接续传递](https://github.com/ceilf6/Lab/commit/fd0f993a4b22253adc54ee10754085b90f59a0af)
- [通过 ref 转发解决 HOC 导致的 ref 错误 如果不加处理，外层 ref 会在 HOC 的包装层上，如果想用最内层的方法需要在 HOC 中间层转发](https://github.com/ceilf6/Lab/commit/fd93e66e2e5da7b5a776d388d78326a81d473ad1)
- [上下文旧版API childContextTypes, getChildContext 创建上下文 contextTypes 获取上下文](https://github.com/ceilf6/Lab/commit/ef0729e6273c145bc97274df641a477404f95531)
- [Context 数据变化时，所有消费者强制更新直接不运行 shouldComponentUpdate setState 被调用时，创建的是一个新对象（即使什么都没有变），那么上下文在比较时（通过Object.is比较引用内存地址）会判断二者不一致、 解决方案：包一层 ctx 后，后面更新 setState({}) => 只影响了 state 但是内部的 ctx 的地址没有变化](https://github.com/ceilf6/Lab/commit/22ff1e07f6ba64fbccc8489418dc2eae83bd2367)
- [旧版效率问题严重，新版上下文API Provider, Consumer/useContext 生产者消费者模式](https://github.com/ceilf6/Lab/commit/350f5333144244f0f57539847bf2950c27ad263e)
