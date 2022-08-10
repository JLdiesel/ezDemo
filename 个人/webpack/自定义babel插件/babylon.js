const { parse } = require('babylon');
// const { parse } = require('@babel/core');
const { default: traverse } = require('babel-traverse');
const { default: generator } = require('@babel/generator');
const t = require('@babel/types');
const code3 = `var a = 1;
function b() {
  var func = () => {
    console.log(this.b);
  };
}
`;
const ast = parse(code3);
traverse(ast, {
  VariableDeclaration: {
    enter(path) {
      if (path.node.kind === 'var') {
        path.node.kind = 'let';
      }
    },
    exit(path) {
      // console.log(path.node.kind);
    }
  },
  ThisExpression: {
    enter(path) {
      const THIS_NAME = '_this';
      const thisNode = t.identifier(THIS_NAME),
        Node = t.variableDeclaration('const', [
          t.variableDeclarator(thisNode, t.identifier('this'))
        ]);
      const outPath = path.findParent((path) => t.isBlockScoped(path.node));
      if (outPath) {
        path.replaceWith(thisNode);
        outPath.insertBefore(Node);
      }
    }
  },
  ArrowFunctionExpression: {
    enter(path) {
      const node = path.node;
      const parent = path.findParent((path) =>
        t.isVariableDeclaration(path.node)
      );
      parent.replaceWith(
        t.functionDeclaration(path.container.id, node.params, node.body)
      );
    },
    exit(path) {}
  }
});
console.log(generator(ast).code);
