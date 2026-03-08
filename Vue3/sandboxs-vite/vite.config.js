const path = require('path')

module.exports = {
    alias: {
        '@': path.resolve(__dirname, './src') // vite路径别名需要手动配置
    }
}
