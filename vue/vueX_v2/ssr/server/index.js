// node服务
// 0. 加载依赖
const express = require('express')
const Vue = require('vue')

const app = express()
const renderer = require('vue-server-renderer').createRenderer()

// 渲染器渲染page得到html内容
// 1. page
const page = new Vue({
    template: "<div>hello ssr!</div>"
})

// 处理静态文件请求
app.use(express.static('../dist/client'))

// 2. 处理传递接口
app.get('*', async(req, res) => {
    try {
        const html = await renderer.renderToString(page)

        res.send(html)
    } catch (error) {
        res.status(500).send('server inner ERROR')
    }
})

// 3. 监听
app.listen(3000, () => {
    console.log('start')
})
