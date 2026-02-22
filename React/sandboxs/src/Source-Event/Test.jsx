import React, { useEffect } from "react";
import  addRootEvent  from "./addRootEvent";

export default () => {
    useEffect(() => {
        // 测试自己模拟实现的事件合成对象、事件传播机制
        // 挂载后才能获取到真实 DOM
        addRootEvent(document.getElementById("application"), "click")
    }, []) // 空依赖，只执行一次

    return (
        <div id="application">
            <div id="return" bindCLICK = {() => console.log("click return")}>
                <button id="child" bindCLICK = {(e) => {
                        // e.stopPropagation()
                        console.log("click child")
                    }}>
                    click
                </button>
            </div>
        </div>
    )
}
