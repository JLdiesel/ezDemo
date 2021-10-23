const obj = {
  name: 'jl',
  age:18
}
//禁止对象继续添加新的属性
Object.preventExtensions(obj)
obj.height = 1.88 //不成功

//禁止配置/删除对象里的属性
Object.seal(obj)
delete obj.name //删除失败

//freeze:冻结  让对象属性不可修改(writeable:false)
Object.freeze(obj)