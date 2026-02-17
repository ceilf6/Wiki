/**
 *
 * @param {*} type 元素类型 h1
 * @param {*} config 属性对象 {id : "aa"}
 * @param {*} children 子元素 hello
 * @returns
 * <h1 id="aa">hello</h1>
 */
export function createElement(type, config, children) {
    let propName;

    const props = {};

    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    // 说明有属性
    if (config != null) {
        // ...
        for (propName in config) {
            if (
                hasOwnProperty.call(config, propName) &&
                !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
                props[propName] = config[propName];
            }
        }
    }
    // 经历了上面的 if 之后，所有的属性都放到了 props 对象上面
    // props ==> {id : "aa"}

    // children 可以有多个参数，这些参数被转移到新分配的 props 对象上
    // 如果是多个子元素，对应的是一个数组
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        // ...
        props.children = childArray;
    }

    // 添加默认的 props
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    // ...
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    );
}

const ReactElement = function (type, key, ref, self, source, owner, props) {
    // 该对象就是最终向外部返回的 vdom（也就是用来描述 DOM 层次结构的 JS 对象）
    const element = {
        // 让我们能够唯一地将其标识为 React 元素
        $$typeof: REACT_ELEMENT_TYPE,

        // 元素的内置属性
        type: type,
        key: key,
        ref: ref,
        props: props,

        // 记录负责创建此元素的组件。
        _owner: owner,
    };
    // ...
    return element;
};