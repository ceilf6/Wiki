import { useRef, useCallback } from "react";

export default function useDebounce(fn, time) {
    const timer = useRef(null);

    const debounceFn = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            fn(...args);
        }, time);
    }, [fn, time]);

    return debounceFn;
}

/*
import { useRef } from "react";

export default function useDebounce(fn, time) {
    return function (...args) {
        let timer = useRef(null) // Hook必须在顶层
        // timer 放在返回函数内部，每次执行都会拿到一个新的 timer 容器
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            fn.apply(this, args) // apply 传的是一个参数数组
        }, time)
    }
}
*/