import request from './request'

export default async function getWiki() {
    const res = await request.get("/ceilf6/Wiki/branch-and-tag-count")
    // 使用过程中直接省略 target ，那么就会自动使用当前网页的 - 肯定不会跨域，这样到时候生产环境也不用改
    // 除非是 静态资源服务器和数据服务器是分开的，例如 http://www.my-site.com 和 http://api.my-site.com/
    console.log(res)
    return res
}

// getWiki()

/*
跨域了
（索引）:1 Access to XMLHttpRequest at 'https://github.com/ceilf6/Wiki/latest-commit/main' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
test.js:4  GET https://github.com/ceilf6/Wiki/latest-commit/main net::ERR_FAILED 406 (Not Acceptable)
*/

/*
成功了
effect-picture/dev-cross-origin.png
*/
