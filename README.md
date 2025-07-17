## jx3box.com 前端开发域名前缀代理插件

### 域名前缀代理功能

自动为带域名前缀的路径生成代理配置，内置常用域名，支持自定义扩展。

#### 内置域名

插件内置以下常用域名，无需额外配置：
- `dev.next2` - 开发环境 next2
- `dev.team` - 开发环境 team  
- `pay` - 支付服务
- `lua` - Lua 脚本服务
- `next2` - next2 服务
- `team` - 团队服务

#### 功能说明

- **前端请求**：`/pay.jx3box.com/orders/123`
- **代理转发**：`https://pay.jx3box.com/orders/123`
- **路径重写**：自动移除域名前缀部分

#### 在 Vue 项目中使用

##### 基础使用（仅内置域名）

```js
// vue.config.js
const VueProxyPlugin = require('@jx3box/jx3box-fe-proxy');

module.exports = {
    devServer: {
        proxy: {
            // 仅使用内置域名
            ...VueProxyPlugin.generateBuiltinProxy()
        },
        disableHostCheck: true,
    }
};
```

##### 扩展使用（内置域名 + 自定义域名）

```js
// vue.config.js
const VueProxyPlugin = require('@jx3box/jx3box-fe-proxy');

// 定义额外的自定义域名
const CUSTOM_DOMAINS = ['abc', 'def', 'dev.xyz'];

module.exports = {
    devServer: {
        proxy: {
            // 内置域名 + 自定义域名
            ...VueProxyPlugin.generateProxy(CUSTOM_DOMAINS)
        },
        disableHostCheck: true,
    }
};
```

#### 代理工作原理

```js
// 前端请求
fetch('/pay.jx3box.com/orders/123')          // 内置域名
fetch('/next2.jx3box.com/api/posts')         // 内置域名
fetch('/dev.team.jx3box.com/members')        // 内置域名
fetch('/abc.jx3box.com/users/list')          // 自定义域名

// 代理处理流程：
// 1. 匹配规则：/pay.jx3box.com、/next2.jx3box.com 等
// 2. 目标服务器：https://pay.jx3box.com、https://next2.jx3box.com 等
// 3. 路径重写：移除域名前缀部分
// 4. 最终请求：https://pay.jx3box.com/orders/123 等
```

#### 生成的代理配置示例

```js
{
  "/pay.jx3box.com": {
    "target": "https://pay.jx3box.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/pay.jx3box.com": ""
    },
    "onProxyReq": function (request) {
      request.setHeader("origin", "");
    }
  },
  "/next2.jx3box.com": {
    "target": "https://next2.jx3box.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/next2.jx3box.com": ""
    },
    "onProxyReq": function (request) {
      request.setHeader("origin", "");
    }
  },
  "/dev.team.jx3box.com": {
    "target": "https://dev.team.jx3box.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/dev.team.jx3box.com": ""
    },
    "onProxyReq": function (request) {
      request.setHeader("origin", "");
    }
  }
}
```

### API 说明

#### VueProxyPlugin.generateProxy(domains, customProxy)

生成包含内置域名和自定义域名的完整代理配置。

- `domains`: 自定义域名列表，如 `['abc', 'def', 'dev.xyz']`
- `customProxy`: 自定义代理配置（可选）

#### VueProxyPlugin.generateBuiltinProxy(customProxy)

仅生成内置域名的代理配置。

- `customProxy`: 自定义代理配置（可选）

#### VueProxyPlugin.getBuiltinDomains()

获取内置域名列表。

#### 使用示例

```js
// 仅使用内置域名
const builtinProxy = VueProxyPlugin.generateBuiltinProxy();

// 内置域名 + 自定义域名
const fullProxy = VueProxyPlugin.generateProxy(['abc', 'def']);

// 获取内置域名列表
const builtinDomains = VueProxyPlugin.getBuiltinDomains();
console.log(builtinDomains); // ["dev.next2", "dev.team", "pay", "lua", "next2", "team"]

// 带自定义配置
const customProxy = VueProxyPlugin.generateProxy(
    ['abc'], 
    {
        '/api/external': {
            target: 'https://external.example.com',
            changeOrigin: true
        }
    }
);
```