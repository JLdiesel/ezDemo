 const { getOptions } = require("loader-utils");// webpack5后可以直接通过this.query
module.exports = function (content) {
  console.log(content);
  console.log(this.query); //传递的options
  const options=getOptions() //webpack5之前常用的获取options的方法 
  console.log('自定义loader1');
  return content
}