type Book = {
    id: number;
    title: string;
};

class BookCollection {
    private readonly books: Book[] = [];

    add(book: Book): void {
        this.books.push(book);
    }

    // function*
    // Generator 作为具体迭代器：按顺序逐个产出集合元素
    *createIterator(): Generator<Book, void, unknown> {
        for (const book of this.books) {
            yield book;
        }
    }
}

function runDemo(): void {
    const collection = new BookCollection();
    collection.add({ id: 1, title: "Design Patterns" });
    collection.add({ id: 2, title: "Refactoring" });
    collection.add({ id: 3, title: "Clean Code" });

    console.log("--- 手动 next() 遍历 ---");
    const iterator = collection.createIterator();
    let result = iterator.next();
    while (!result.done) { // 迭代器对象还没有 done
        console.log(result.value);
        result = iterator.next();
    }

    console.log("--- for...of 遍历 ---");
    for (const book of collection.createIterator()) {
        console.log(`${book.id}. ${book.title}`);
    }
}

runDemo();
