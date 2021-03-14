const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");

const isAjax = function (path) {
    let node = path.node;
    if (!node) {
        return false;
    } else if (node.callee.name === '$ajax') {
        return true;
    } else if (t.isMemberExpression(node.callee) && node.callee.property.name ==='$ajax') {
        return true;
    } else {
        return false;
    }
}

module.exports = function (source) {
    let ast = parser.parse(source, {
        sourceType: "module", // es6 module
        plugins: ["dynamicImport"] // import
    });
    traverse(ast, {
        CallExpression(path) {
            if (isAjax(path) && !t.isAwaitExpression(path.parent)) {
                let awaitAst = t.AwaitExpression(
                    path.node
                );
                path.replaceWithMultiple([awaitAst]);
                while (path && path.node) {
                    let parentPath = path.parentPath;
                    if (t.isFunctionDeclaration(path.node)) {
                        path.node.async = true;
                        return ;
                        
                    } else {
                        path = parentPath;
                    }
                }
            } else {
                return ; 
            }
        }
    });
    return core.transformFromAstSync(ast, null, {
        configFile: false // 屏蔽 babel.config.js，否则注入 polyfill 不好调试
    }).code;
};