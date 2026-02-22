## 核心实现原理

### 1. Canvas 图像序列播放器

代码中有两个自定义类来处理 Canvas 帧动画：
- `Sr` 类 → 控制 `.bannerCv`（120 帧）
- `Tr` 类 → 控制 `.batteryCv`（150 帧）

它们都暴露了一个 `upData(frameIndex)` 方法，传入帧编号就会绘制对应帧。

---

### 2. GSAP ScrollTrigger + `scrub` — 滚轮驱动动画的核心

**Banner 区域（120帧）：**
```javascript
var a = new Sr({ el: ".bannerCv" }); // 创建banner画布播放器
var o = { value: 0 };               // 虚拟帧计数器

gsap.timeline({
  scrollTrigger: {
    trigger: n.banner,
    start: "-=0",
    end: "+=" + t.winsize.vh,  // 滚动一个屏幕高度
    scrub: 0.9  // ← 关键！将滚动条进度绑定到动画播放头
  },
  onUpdate: function() {
    a.upData(parseInt(o.value)); // 每帧更新时，通知画布绘制新帧
  }
})
.fromTo(o, { value: 0 }, { value: 120, ease: "none" }); // 将帧号从0变到120
```

**Battery 区域（150帧）：**
```javascript
var A = new Tr({ el: ".batteryCv" });
var f = { value: 0 };

gsap.timeline({
  scrollTrigger: {
    trigger: n.process,
    start: "-=" + t.winsize.vh,
    end: "+=" + t.winsize.vh * (c + 1),
    scrub: 0.8  // ← 同样用scrub绑定滚动
  },
  onUpdate: function() { A.upData(parseInt(f.value)); }
})
.fromTo(f, { value: 0 }, { value: 150 * c, ease: "none" });
```

---

### 3. `scrub` 属性

`scrub` 是 GSAP ScrollTrigger 的核心配置：

```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: banner,
    scrub: 0.9  // 这一个属性完成了全部"绑定"工作
  }
}).fromTo(frameObj, { value: 0 }, { value: 120 })
```

| 值 | 效果 |
|---|---|
| `true` | 滚动条直接映射到动画进度，无缓动 |
| `0.9` | 有 0.9 秒的平滑缓动，使画面过渡更流畅 |

**数据流向：**
```
用户滚动
  → ScrollTrigger 计算 [0, 1] 进度
  → 驱动 GSAP Tween 更新 o.value (0 → 120)
  → onUpdate 回调调用 canvas.upData(frameIndex)
  → Canvas drawImage() 绘制对应帧
  → 视觉上形成"滚动控制动画"
```

---

### 4. 其他元素的视差效果

非 Canvas 元素（文字、图片）使用同样的 `scrub` 机制实现视差：
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: e,
    start: "-=" + t.winsize.vh,
    end: "+=" + (height + t.winsize.vh),
    scrub: 0.9   // 同样是scrub
  }
})
.fromTo(e, { x: -n, y: -r }, { x: n, y: r }); // 上下/左右视差位移
```

---

**总结：** 整个效果的技术本质是 **GSAP ScrollTrigger 的 `scrub` 属性**，它把滚动条的位置实时映射为动画的播放进度，配合 Canvas 逐帧绘制图像序列
```html
<!-- 动画帧图片来源 -->
<canvas class="bannerCv"
  data-path="/templates/assets/home/bannerFm/"
  data-count="120">
</canvas>
```
到时候JS运行时读取
```javascript
for (let i = 0; i < 120; i++) {
  const img = new Image();
  img.src = `/templates/assets/home/bannerFm/${pad(i)}.jpg`;
}
```


手写实现类似效果
```javascript
window.addEventListener('scroll', () => {
  const progress = (scrollY - sectionTop) / sectionHeight; // 手算进度
  const frame = Math.round(progress * 120);
  canvas.drawImage(images[frame], 0, 0);
});
```