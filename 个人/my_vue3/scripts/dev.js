//node scripts/dev.js reactivity -f global
//{ _: [ 'reactivity' ], f: 'global' }
//解析命令行参数
const minimist = require('minimist');
const { resolve } = require('path');
const { build } = require('esbuild');
const args = minimist(process.argv.slice(2));
console.log(args);
const target = args._[0] || 'reactivity';
const format = args.f || 'global';

//开发环境只打包某一个
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));
console.log(pkg);
/* 
iife 立即执行函数 (function(){})()
cjs commonjs module.exports
esm esModule import
*/
// 输出格式
const outputFormat = format.startsWith('global')
  ? 'iife'
  : format === 'cjs'
  ? 'cjs'
  : 'esm';
// 打包后的目录
const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);

build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)], //入口
  outfile, //出口
  bundle: true, //把所有的包全部打包在一起
  sourcemap: true,
  format: outputFormat, //输出格式
  globalName: pkg.buildOptions?.name, //全局名字
  platform: format === 'cjs' ? 'node' : 'browser', //平台
  watch: {
    //监控文件变化
    onRebuild(error) {
      if (!error) console.log('rebuild~~~~');
    }
  }
}).then(() => {
  console.log('watching~~~');
});
