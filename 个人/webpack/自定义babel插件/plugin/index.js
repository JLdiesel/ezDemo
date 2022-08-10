const t = require('@babel/types');
module.exports = function ({ types }) {
  // Some plugin code here
  return {
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === 'var') {
          path.node.kind = 'let';
        }
      },
      ThisExpression(path) {
        //先构建var _this = this
        const THIS_NAME = '_this';
        // 得到一个_this
        const str = t.identifier(THIS_NAME),
          node = t.variableDeclaration('var', [
            t.variableDeclarator(str, t.identifier('this'))
          ]);
        //查找父子节点
        let parentPath1 = path.findParent((path) => t.isBlockScoped(path.node));
        path.replaceWith(str);
        if (parentPath1) {
          parentPath1.insertBefore(node);
        } else {
          return;
        }
      },
      ArrowFunctionExpression(path) {
        const node = path.node;
        const parent = path.findParent((path) => path.isVariableDeclaration());
        parent.replaceWith(
          t.functionDeclaration(path.container.id, node.params, node.body)
        );
      }
    }
  };
};
