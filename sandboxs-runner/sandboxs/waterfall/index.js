// 1. 现代属性
// .container{
//     display: grid;
//     grid-template-rows: masonry; // !!!
//     grid-template-columns: renderToPipeableStream(4, 1fr);
//     grid-gap: 10px;
// }

// 2. 手动实现
// // 本质是利用 绝对定位 去设置图片坐标，难点在于定位维护
// // cal 函数去拿到列数以及间隙
// // setPosition 函数中维护一个长度为 cal 拿到的列数数量的数组，每一项表示当前图片的结束 y 坐标

var divContainer = document.getElementById('container');
var imgWidth = 220; //每张图片的固定宽度

//1. 加入图片元素
function createImgs() {
  for (var i = 0; i <= 7; i++) {
    var src = 'img/' + i + '.jpg'; //生成图片的src路径
    var img = document.createElement('img');
    img.onload = setPoisions;
    img.src = src; //设置src路径
    divContainer.appendChild(img); //添加到容器中
  }
}

createImgs();

// 2. 设置每张图片的位置

function setPoisions() {
  /**
   * 计算一共有多少列，以及每一列之间的间隙
   */
  function cal() {
    var containerWidth = divContainer.clientWidth; //容器的宽度
    //计算列的数量
    var columns = Math.floor(containerWidth / imgWidth);
    //计算间隙
    var spaceNumber = columns + 1; //间隙数量
    var leftSpace = containerWidth - columns * imgWidth; //计算剩余的空间
    var space = leftSpace / spaceNumber; //每个间隙的空间
    return {
      space: space,
      columns: columns,
    };
  }
  var info = cal(); //得到列数，和 间隙的空间
  var nextTops = new Array(info.columns); //该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
  nextTops.fill(0); //将数组的每一项填充为0
  for (var i = 0; i < divContainer.children.length; i++) {
    var img = divContainer.children[i];
    //找到nextTops中的最小值作为当前图片的纵坐标
    var minTop = Math.min.apply(null, nextTops);
    img.style.top = minTop + 'px';
    //重新设置数组这一项的下一个top值
    var index = nextTops.indexOf(minTop); //得到使用的是第几列的top值
    nextTops[index] += img.height + info.space;
    //横坐标
    var left = (index + 1) * info.space + index * imgWidth;
    img.style.left = left + 'px';
  }
  var max = Math.max.apply(null, nextTops); //求最大值
  divContainer.style.height = max + 'px'; //3. 设置容器的高度
}

var timerId = null; //一个计时器的id
window.onresize = function () {
  //窗口尺寸变动后，重新排列
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(setPoisions, 300);
};
