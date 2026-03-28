import * as fs from "fs";
import * as path from "path";

// 补上构造函数参数类型
type FileOptions = {
    dir: string;
    filename: string;
    name: string;
    ext: string;
    size: number;
    createTime: Date;
    updateTime: Date;
    isFile: boolean;
    isDirectory: boolean;
    children?: MyFile[];
    content?: Buffer;
};

class MyFile {
    dir: string;
    filename: string;
    name: string;
    ext: string;
    size: number;
    createTime: Date;
    updateTime: Date;
    isFile: boolean;
    isDirectory: boolean;
    children?: MyFile[];
    content?: Buffer;

    constructor(options: FileOptions) {
        Object.assign(this, options);
    }

    // 缓存 Promise，防止重复读取
    static childNamesProsCache: Map<string, Promise<string[]>> = new Map();
    static contentProsCache: Map<string, Promise<Buffer>> = new Map();

    // 静态工厂方法
    static async create(dir: string): Promise<MyFile> {
        const stat = await fs.promises.stat(dir);
        const parsed = path.parse(dir);

        return new MyFile({
            dir,
            filename: path.basename(dir),
            name: parsed.name,
            ext: parsed.ext,
            size: stat.size,
            createTime: stat.birthtime,
            updateTime: stat.mtime,
            isFile: stat.isFile(),
            isDirectory: stat.isDirectory(),
        });
    }

    async getChildren(): Promise<string[] | null> {
        if (!this.isDirectory) return null;

        if (MyFile.childNamesProsCache.has(this.dir)) {
            console.log("命中全局缓存");
            return MyFile.childNamesProsCache.get(this.dir)!;
        }

        const childNamesPro = fs.promises.readdir(this.dir).catch((e) => {
            MyFile.childNamesProsCache.delete(this.dir);
            throw e;
        });

        MyFile.childNamesProsCache.set(this.dir, childNamesPro);
        return childNamesPro;
    }

    async getContent(): Promise<Buffer | null> {
        if (!this.isFile) return null;

        if (MyFile.contentProsCache.has(this.dir)) {
            return MyFile.contentProsCache.get(this.dir)!;
        }

        const contentPro = fs.promises.readFile(this.dir).catch((err) => {
            MyFile.contentProsCache.delete(this.dir);
            throw err;
        });

        MyFile.contentProsCache.set(this.dir, contentPro);
        return contentPro;
    }

    static async fsDFSread(dir: string): Promise<MyFile> {
        const curFile = await MyFile.create(dir);

        if (curFile.isDirectory) {
            const childNames = await curFile.getChildren();

            if (childNames) {
                const children = await Promise.all(
                    childNames.map((name) =>
                        MyFile.fsDFSread(path.resolve(curFile.dir, name))
                    )
                );
                curFile.children = children;
            }
        } else if (curFile.isFile) {
            const content = await curFile.getContent();
            if (content) {
                curFile.content = content;
            }
        }

        return curFile;
    }
}

const test = async (): Promise<void> => {
    const testPath = path.resolve(__dirname, "./testFiles");
    const res = await MyFile.fsDFSread(testPath);
    console.dir(res, { depth: null });

    const file = await MyFile.create(testPath);
    const childs = await file.getChildren(); // 命中全局缓存
    console.log(childs);
};

test().catch(console.error);