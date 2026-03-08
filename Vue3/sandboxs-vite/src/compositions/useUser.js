// 利用 Vue3 的 reactive API 模拟 vuex
// Vue2/sandboxs/src/store/loginAdmin.js

import { reactive, readonly, toRefs } from 'vue'
import * as userAPI from '../api/user.js'

const userState = reactive({ // 全局的响应式数据
    user: null,
    loading: false
})
const readOnlyUserState = readonly(userState)
// 对外暴露的是只读的以及API接口

// reactive 拿到的是 proxy 不需要取 .value 
// ref Object才需要
async function login(loginId, loginPwd) {
    userState.loading = true
    try { // 注意接口兜底（下面同理）
        const res = await userAPI.login(loginId, loginPwd)
        userState.user = res
        return res
    } finally {
        userState.loading = false
    }
}

async function loginOut() {
    userState.loading = true
    await userAPI.loginOut()
    userState.user = null
    userState.loading = false
}

async function whoAmI() {
    userState.loading = true
    const res = await userAPI.whoAmI()
    userState.user = res
    userState.loading = false
    return res
}

// 闭包隐藏 userState
export default function useUser() {
    return {
        ...toRefs(readOnlyUserState),
        login,
        loginOut,
        whoAmI
    }
}