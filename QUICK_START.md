# 快速开始指南

## 安装

```bash
npm install @jx3box/jx3box-fe-proxy --save-dev
```

## 基础使用

在你的 `vue.config.js` 文件中：

```javascript
const VueProxyPlugin = require('@jx3box/jx3box-fe-proxy');

module.exports = {
    devServer: {
        proxy: VueProxyPlugin.generateBuiltinProxy(),
        disableHostCheck: true,
    }
};
```

## 添加自定义域名

```javascript
const VueProxyPlugin = require('@jx3box/jx3box-fe-proxy');

const CUSTOM_DOMAINS = ['api', 'admin', 'dev.custom'];

module.exports = {
    devServer: {
        proxy: VueProxyPlugin.generateProxy(CUSTOM_DOMAINS),
        disableHostCheck: true,
    }
};
```

## 前端使用

配置完成后，你可以直接在前端代码中使用：

```javascript
// 这些请求会被自动代理到对应的域名
fetch('/pay.jx3box.com/api/orders')
fetch('/next2.jx3box.com/api/posts')  
fetch('/api.jx3box.com/users') // 如果添加了自定义域名
```

## 内置域名列表

- `dev.next2` - 开发环境 next2
- `dev.team` - 开发环境 team  
- `pay` - 支付服务
- `lua` - Lua 脚本服务
- `next2` - next2 服务
- `team` - 团队服务
- `ipay` - 支付服务

## 更多示例

查看 `usage-examples/` 目录中的详细示例文件。
