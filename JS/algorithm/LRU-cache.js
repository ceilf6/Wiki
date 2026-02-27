function Node(key, value) {
    this.key = key; // 记录当前节点在 cache 中的键，在 _pop 中 delete 需要用到
    this.value = value;
    this.pre = null;
    this.next = null;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.cache = Object.create(null);
    this.size = 0;
    this.capacity = capacity

    this.first = new Node(null, null) // 虚拟头
    this.last = new Node(null, null) // 虚拟尾
    this.first.next = this.last
    this.last.pre = this.first
};

/* _ 开头的内部使用工具函数 */
// 删除节点操作
LRUCache.prototype._removeNode = function (node) {
    const pre = node.pre;
    const next = node.next;
    pre.next = next;
    next.pre = pre;
    this.size--;
    // 内存中删除 cur 操作（JS自动GC）
}

// 节点入队 - 链表头入队（不负责创造节点）
LRUCache.prototype._push = function (node) {
    const firstNext = this.first.next
    node.pre = this.first
    node.next = firstNext
    firstNext.pre = node
    this.first.next = node
    this.size++
}

// 节点移动到队头 - 刷新地位操作：先删除节点再入队
LRUCache.prototype._refresh = function (node) {
    this._removeNode(node)
    this._push(node)
}

// 链表尾出队
LRUCache.prototype._pop = function () {
    const lru = this.last.pre
    if (lru === this.first) return // 空
    this._removeNode(lru) // 删除节点操作已经对 size 进行了处理
    delete this.cache[lru.key]
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.cache[key]
    if (!node) return -1
    this._refresh(node)
    return node.value
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const node = this.cache[key]
    if (node) {
        node.value = value
        this._refresh(node)
    } else {
        const newNode = new Node(key, value)
        this.cache[key] = newNode
        this._push(newNode)
        if (this.size > this.capacity) this._pop();
    }
};

class LRUCache {
    constructor(capacity) {
        this.map = new Map()
        this.space = capacity
    }

    get(key) {
        if (!this.map.has(key)) return -1

        // get 也要刷新地位
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }

    put(key, value) {
        if (this.map.has(key)) this.map.delete(key) //别忘记刷新地位

        this.map.set(key, value)

        if (this.map.size > this.space) { // 注意是 size 而不是 length
            const last = this.map.keys().next().value; // keys().next().value
            this.map.delete(last)
        }
    }
}