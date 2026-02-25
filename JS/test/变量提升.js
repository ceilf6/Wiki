console.log(typeof (x)); // ✓ undefined（var 提升 + 初始化）
var x = 1;

// ====

let y = 'outer';
{
    console.log(y); // ReferenceError，而不是 'outer'
    let y = 'inner'; // 块内的 y 已经提升占住了这个名字，外层 y 被屏蔽
}