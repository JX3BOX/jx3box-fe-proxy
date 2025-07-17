

const prodDomain = {
    "pay": "https://pay.jx3box.com",
    "next2": "https://next2.jx3box.com",
    "cms": "https://cms.jx3box.com",
    "team": "https://team.jx3box.com",
    "gs": "https://gs.jx3box.com",
    "lua": "https://lua.jx3box.com",
    "ipay": "https://ipay.jx3box.com",
}


const devDomain = Object.assign({}, prodDomain, {
    "team": "https://dev.team.jx3box.com",
    "next2": "https://dev.next2.jx3box.com",
})

const getProxy = function (domain) {
    return {
        "/api/horn": {
            target: domain["pay"],//"https://pay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/inspire": {
            target: domain["pay"],//"https://pay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/vip": {
            target: domain["pay"],//"https://pay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/cny": {
            target: domain["pay"], //"https://pay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/summary": {
            target: domain["next2"],//"https://next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/comment": {
            target: domain["next2"], //"https://next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/cms": {
            // target: process.env["DEV_SERVER"] == "true" ? "http://localhost:7100" : "https://cms.jx3box.com",
            target: domain["cms"] //"https://cms.jx3box.com",
        },
        "/api/summary-any": {
            target: domain["next2"], //"https://next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/team": {
            target: domain["team"], //"https://team.jx3box.com",
            // target: process.env["DEV_SERVER"] == "true" ? "https://dev.team.jx3box.com" : "https://team.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/search": {
            target: domain["gs"], //"https://gs.jx3box.com",
            changeOrigin: true,
        },
        "/pay/web": {
            target: domain["ipay"], //"https://ipay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/pay": {
            target: domain["pay"], //"https://pay.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/summary-any": {
            target: domain["next2"], //"https://next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/letter": {
            target: domain["next2"], //"https://dev.next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/next2": {
            target: domain["next2"],//"https://dev.next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api/lua": {
            target: domain["lua"],   //"https://lua.jx3box.com/",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        },
        "/api": {
            target: domain["next2"],// "https://dev.next2.jx3box.com",
            onProxyReq: function (request) {
                request.setHeader("origin", "");
            },
        }
    }
}
module.exports = function (isDev, proxyMap) {
    const domain = isDev ? devDomain : prodDomain;
    const proxy = getProxy(domain);
    return Object.assign({}, proxy, proxyMap);
}
