## jx3box.com 前端开发vue代理列表

在 `vue.config.js` 配置如下:

```js
const feproxy = require("@jx3box/jx3box-fe-proxy");

module.exports = {
    ...
      //❤️ Proxy ~
    devServer: {
        proxy: feproxy(process.env["DEV_SERVER"] == "true"),
        disableHostCheck: true,
    },
    ```
}
```

说明：

```
feproxy(isDev: boolean, override?: {})

    isDev 如果为假，走正式域名，否则为测试域名
    override: 如果开发过程中存在没有走代理的情况，那么可以通过此参数 覆盖或新增配置。 如果配置常用 后续将改配置提交issue同步到@jx3box/jx3box-fe-proxy即可
       格式： {
            "/api/xxxx": {
                target: "https://xxxxx.jx3box.com/",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            .....
        }
```