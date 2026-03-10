前端的本质，是数据流动与 UI 状态在浏览器中的映射与同步。

前端，是让抽象的数据在浏览器中获得可感知形态的艺术。

UI = f(state)
    Hook => state
        framework like React is f which parse the Hook-state change, really apply API in host environment
        Fiber Obj => time slice => update

大模型让技术隔阂逐渐模糊，未来也许需要的是有 产品 和 业务 思维、决策能力的工程师