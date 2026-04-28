// https://nodejs.org/docs/latest/api/url.html

const URL = require("url")

// URL对象
const urlObj = new URL.URL("https://github.com:666/ceilf6/Wiki?name=ceilf6&key=so-handsome")
console.log(urlObj)
/*
URL {
  href: 'https://github.com:666/ceilf6/Wiki?name=ceilf6&key=so-handsome',
  origin: 'https://github.com:666',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'github.com:666',
  hostname: 'github.com',
  port: '666',
  pathname: '/ceilf6/Wiki',
  search: '?name=ceilf6&key=so-handsome',
  searchParams: URLSearchParams { 'name' => 'ceilf6', 'key' => 'so-handsome' },
  hash: ''
}
*/

// 参数对象
console.log("urlObj.URLSearchParams.has('name')", urlObj.searchParams.has('name'))
console.log("urlObj.searchParams.get('key')", urlObj.searchParams.get('key'))

const urlSearchParamsIns = new URLSearchParams({ 'name': 'ceilf6', 'key': 'so-handsome' })
console.log(urlSearchParamsIns)
console.log('?' + urlSearchParamsIns)

const formatFromURLObj = URL.format(urlObj)
console.log(formatFromURLObj)
