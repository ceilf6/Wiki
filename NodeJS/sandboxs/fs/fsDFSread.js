const fs = require("fs");
const path = require("path");

class MyFile {
    constructor(options) {
        // 传入一个对象自动将所有属性自动赋值
        Object.assign(this, options);
    }

    // 通过静态Map实现全局缓存，而不只是实例级别的缓存
    // 通过缓存 Promises 防止缓存击穿，重复读取
    static childNamesProsCache = new Map();
    static contentProsCache = new Map()

    // 通过静态工厂方法解决构造函数无法异步的问题
    static async create(dir) {
        const stat = await fs.promises.stat(dir);

        const parsed = path.parse(dir)
        return new MyFile({
            dir,
            filename: parsed.base,
            name: parsed.name,
            ext: parsed.ext,
            size: stat.size,
            createTime: stat.birthtime,
            updateTime: stat.mtime,
            isFile: stat.isFile(),
            isDirectory: stat.isDirectory(),
            // 注意 是否为文件 直接调用了函数获取了布尔值，防止后面还需要一次次调用函数
        });
    }

    async getChildren() {
        // 不是文件夹就没有子文件
        if (!this.isDirectory) return null;

        // 利用缓存
        // if (this.children !== undefined) {
        if (MyFile.childNamesProsCache.has(this.dir)) {
            console.log('命中全局缓存')
            // return this.children
            return MyFile.childNamesProsCache.get(this.dir)
        }

        const childNamesPro = fs.promises
            .readdir(this.dir)
            .catch(e => {
                // 如果碰到错误，那么在上抛之前先将缓存处理了
                MyFile.childNamesProsCache.delete(this.dir)
                throw e
            })

        // 缓存层和方法返回值设计统一：只在内部维护缓存
        MyFile.childNamesProsCache.set(this.dir, childNamesPro)
        return childNamesPro
    }

    async getContent() {
        // 不是文件就没有内容
        if (!this.isFile) return null;

        // 注意 '' 这个假值也算是缓存
        if (MyFile.contentProsCache.has(this.dir))
            return MyFile.contentProsCache.get(this.dir)

        const contentPro = fs.promises
            .readFile(this.dir)
            .catch(err => {
                MyFile.contentProsCache.delete(this.dir);
                throw err;
            });

        MyFile.contentProsCache.set(this.dir, contentPro)
        return contentPro
    }

    // 静态类方法
    static async fsDFSread(dir) {
        const curFile = await MyFile.create(dir);

        if (curFile.isDirectory) {
            // getChildren只负责获取子文件数组
            // 不负责组装和DFS，否则职责过重
            const childNames = await curFile.getChildren()

            // 通过 map 中调用 async 获得 多个异步任务Promise
            // 然后外层包一个 Promise.all 并行处理
            const children = await Promise.all(
                childNames.map(name => MyFile.fsDFSread(path.resolve(curFile.dir, name)))
            );
            curFile.children = children
        } else if (curFile.isFile) {
            const content = await curFile.getContent()
            curFile.content = content
        }

        return curFile
    }
}

const test = async () => {
    const testPath = path.resolve(__dirname, './testFiles')
    const res = await MyFile.fsDFSread(testPath)
    console.dir(res, { depth: null });

    const MyFile = await MyFile.create(testPath)
    const childs = await MyFile.getChildren() // 命中全局缓存
}
test()