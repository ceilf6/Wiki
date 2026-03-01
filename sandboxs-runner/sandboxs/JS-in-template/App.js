import { h } from 'vue' // 通过h创建虚拟节点，即Vue编译模块在打包时候做的事情

export default {
    setup() {
        return () => {
            const list = [];
            for (let i = 1; i <= 20; i++) {
                list.push(h('li', { key: i, class: 'list-item' }, `Item ${i} created by JS`))
            }
            const ul = h('ul', { class: 'list' }, list);
            return ul;
        }
    }
}