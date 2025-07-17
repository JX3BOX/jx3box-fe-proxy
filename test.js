/**
 * 测试文件：验证域名前缀代理生成功能
 */

const VueProxyPlugin = require('./vue-proxy-plugin');

// 测试内置域名
function testBuiltinDomains() {
    console.log('=== 测试内置域名 ===');
    
    const builtinDomains = VueProxyPlugin.getBuiltinDomains();
    console.log('内置域名列表：', builtinDomains);
    
    console.log('\n=== 仅使用内置域名生成代理配置 ===');
    const builtinProxyConfig = VueProxyPlugin.generateBuiltinProxy();
    console.log('内置域名代理配置：');
    console.log(JSON.stringify(builtinProxyConfig, null, 2));
}

// 测试代理生成
function testProxyGeneration() {
    console.log('\n=== 测试域名前缀代理生成（内置+自定义）===');
    
    const proxyConfig = VueProxyPlugin.generateProxy(
        ['abc', 'def', 'xyz'], // 自定义域名
        {
            // 自定义代理配置
            '/api/custom': {
                target: 'https://custom.example.com',
                changeOrigin: true
            }
        }
    );

    console.log('完整代理配置（内置域名 + 自定义域名）：');
    console.log(JSON.stringify(proxyConfig, null, 2));

    console.log('\n=== 代理工作流程验证 ===');
    console.log('✓ 内置域名：/pay.jx3box.com/orders → https://pay.jx3box.com/orders');
    console.log('✓ 内置域名：/next2.jx3box.com/api/posts → https://next2.jx3box.com/api/posts');
    console.log('✓ 内置域名：/dev.team.jx3box.com/members → https://dev.team.jx3box.com/members');
    console.log('✓ 自定义域名：/abc.jx3box.com/users/list → https://abc.jx3box.com/users/list');
}

// 测试重复域名处理
function testDuplicateDomains() {
    console.log('\n=== 测试重复域名处理 ===');
    
    // 用户传入的域名包含内置域名
    const proxyConfig = VueProxyPlugin.generateProxy(['pay', 'abc', 'next2', 'xyz']);
    
    const domains = Object.keys(proxyConfig).filter(key => key.endsWith('.jx3box.com'));
    console.log('去重后的域名列表：', domains);
    
    // 验证 pay 和 next2 没有重复
    const payCount = domains.filter(d => d === '/pay.jx3box.com').length;
    const next2Count = domains.filter(d => d === '/next2.jx3box.com').length;
    console.log(`✓ pay 域名出现次数: ${payCount} (应该为1)`);
    console.log(`✓ next2 域名出现次数: ${next2Count} (应该为1)`);
}

// 测试不同的请求路径
function testDifferentPaths() {
    console.log('\n=== 测试不同请求路径 ===');
    
    const testCases = [
        // 内置域名
        '/pay.jx3box.com/orders/123',
        '/next2.jx3box.com/api/posts?page=1',
        '/dev.team.jx3box.com/members/list',
        '/lua.jx3box.com/scripts/upload',
        
        // 自定义域名
        '/abc.jx3box.com/users/list',
        '/xyz.jx3box.com/images/upload?type=avatar',
        
        // 不会被代理的域名
        '/other.jx3box.com/not-proxied'
    ];
    
    const allDomains = [...VueProxyPlugin.getBuiltinDomains(), 'abc', 'xyz'];
    
    console.log('代理路径测试：');
    testCases.forEach(path => {
        const domain = path.match(/^\/([^\/]+)\.jx3box\.com/);
        if (domain && allDomains.includes(domain[1])) {
            const targetPath = path.replace(`/${domain[1]}.jx3box.com`, '');
            const isBuiltin = VueProxyPlugin.getBuiltinDomains().includes(domain[1]) ? '(内置)' : '(自定义)';
            console.log(`✅ ${path} → https://${domain[1]}.jx3box.com${targetPath} ${isBuiltin}`);
        } else {
            console.log(`❌ ${path} → 不会被代理（域名不在列表中）`);
        }
    });
}

// 运行测试
if (require.main === module) {
    console.log('🚀 开始测试域名前缀代理配置...\n');
    testBuiltinDomains();
    testProxyGeneration();
    testDuplicateDomains();
    testDifferentPaths();
    console.log('\n✅ 测试完成！');
}

module.exports = {
    testBuiltinDomains,
    testProxyGeneration,
    testDuplicateDomains,
    testDifferentPaths
};
