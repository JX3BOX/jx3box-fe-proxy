/**
 * vue.config.js 配置示例
 * 域名前缀代理配置
 * 
 * 支持内置域名：dev.next2, dev.team, pay, lua, next2, team
 * 支持自定义域名扩展
 */

const VueProxyPlugin = require('@jx3box/jx3box-fe-proxy');

// 方式一：仅使用内置域名
// const proxyConfig = VueProxyPlugin.generateBuiltinProxy();

// 方式二：内置域名 + 自定义域名
const CUSTOM_DOMAINS = ['abc', 'def', 'dev.xyz'];
const proxyConfig = VueProxyPlugin.generateProxy(CUSTOM_DOMAINS);

module.exports = {
    // 开发服务器配置
    devServer: {
        proxy: proxyConfig,
        disableHostCheck: true,
    }
};

/**
 * 代理工作原理：
 * 
 * 内置域名（自动支持）：
 * - /pay.jx3box.com/orders → https://pay.jx3box.com/orders
 * - /next2.jx3box.com/api/posts → https://next2.jx3box.com/api/posts
 * - /dev.team.jx3box.com/members → https://dev.team.jx3box.com/members
 * 
 * 自定义域名（额外添加）：
 * - /abc.jx3box.com/users → https://abc.jx3box.com/users
 * - /dev.xyz.jx3box.com/images → https://dev.xyz.jx3box.com/images
 * 
 * 处理流程：
 * 1. 前端请求：/pay.jx3box.com/orders/123
 * 2. 匹配规则：/pay.jx3box.com
 * 3. 目标服务器：https://pay.jx3box.com
 * 4. 路径重写：移除域名前缀部分
 * 5. 最终请求：https://pay.jx3box.com/orders/123
 * 
 * 生成的代理配置示例：
 * {
 *   "/pay.jx3box.com": {
 *     "target": "https://pay.jx3box.com",
 *     "changeOrigin": true,
 *     "pathRewrite": { "^/pay.jx3box.com": "" }
 *   },
 *   "/abc.jx3box.com": {
 *     "target": "https://abc.jx3box.com",
 *     "changeOrigin": true,
 *     "pathRewrite": { "^/abc.jx3box.com": "" }
 *   }
 * }
 */
