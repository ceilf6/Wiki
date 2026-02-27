function newTarget() {
    if (new.target) {
        console.log('正确的通过 new 调用')
        console.log(new.target)
    } else {
        console.log('使用方法错误，应该用 new')
        return
    }
}

newTarget()
new newTarget()
/*
使用方法错误，应该用 new
正确的通过 new 调用
[Function: newTarget]
*/