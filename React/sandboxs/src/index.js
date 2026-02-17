import React from 'react'; // 虽然也许可能没有使用，如果删了就会报错React.createElement
import ReactDOM from 'react-dom';

// import './test/test1'
// import './test/toggleImg'

// import FuncComp from './test/Comp/func'
// import ClassComp from './test/Comp/class';
// const el = (<FuncComp str="ceilf6" num={7}></FuncComp>)
// console.log(el)
// // 组件生成的仍然是React元素，但是 type: ƒ Comp()
// // 如果首字母不大写的话就是普通元素
// const el2 = (<ClassComp str="ceilf6" num={7}></ClassComp>) // type: class ClassComp
// console.log(el2)
// const allEl = (
//     <>
//         {el}
//         {el2}
//         {<FuncComp useless={false} useful
//             obj={{ name: "ceilf6", age: 20, ui: (<div>nihao</div>) }}
//         >
//         </FuncComp >}
//     </>
// )


// import { Btn, MyBtn } from './test/Event';

// const callback = () => console.log("我被电击了")
// const el = (
//     <div>
//         {Btn()}
//         <MyBtn callback={callback} onClick={() => console.log("自定义组件的onClick")} />
//     </div>
// )

// import StateNotInEvent from './test/StateNotInEvent'
// import StateMulCallBack from './test/StateMulCallBack'
// import StateMulNotSync from './test/StateMulNotSync'
// const el = (
//     <>
//         <h1>StateInEvent</h1>
//         <StateInEvent number={5} />
//         <h1>StateNotInEvent</h1>
//         <StateNotInEvent number={5} />
//         <h1>StateMulCallBack</h1>
//         <StateMulCallBack number={5} />
//         <h1>StateMulNotSync</h1>
//         <StateMulNotSync number={5} />
//     </>
// )

// import AppOldLifeCylcle from './test/AppOldLifeCylcle'

// const el = (
//     <AppOldLifeCylcle />
// )


import App from './App'
// ReactDOM.render(<App />, document.getElementById('root'))

import ClassCompRender from './test/ClassCompRender'
const app = <div className="prop">
    <h1>
        标题
        {["abc", null, <p>段落</p>]}
    </h1>
    <p>
        {undefined}
    </p>
    <ClassCompRender />
</div>;

function setProps(dom, props = {}) {
    for (const [key, value] of Object.entries(props)) {
        if (key === 'children' || value == null) continue;

        if (key === 'className') {
            dom.setAttribute('class', value);
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(dom.style, value);
        } else if (/^on[A-Z]/.test(key) && typeof value === 'function') {
            const eventName = key.slice(2).toLowerCase();
            dom.addEventListener(eventName, value);
        } else if (key in dom) {
            dom[key] = value;
        } else {
            dom.setAttribute(key, String(value));
        }
    }
}
function render(vnode, container) {
    if (Array.isArray(vnode)) {
        vnode.forEach(child => render(child, container));
        return;
    }

    if (vnode == null || typeof vnode === 'boolean') return;

    if (typeof vnode === 'string' || typeof vnode === 'number') {
        container.appendChild(document.createTextNode(String(vnode)));
        return;
    }

    if (typeof vnode.type === 'function') {
        render(vnode.type(vnode.props || {}), container);
        return;
    }

    if (!vnode || typeof vnode !== 'object' || !vnode.type) return;

    const dom = document.createElement(vnode.type);
    setProps(dom, vnode.props);
    render(vnode.props?.children, dom); // 直接递归，不手动包一层 list
    container.appendChild(dom);
}
// const root = document.getElementById('root');
// render(app, root);

console.log(app)
ReactDOM.render(app, document.getElementById('root'));
