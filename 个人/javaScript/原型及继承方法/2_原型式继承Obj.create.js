
const obj={
    name:'why',
    age:18
}

function createObj(obj) {
    const newObj={};
    Object.setPrototypeOf(newObj,obj);
    return newObj
}
function createObj2(obj) {
    function Fn() { }
    Fn.prototype = obj
    return new Fn()
}
//将obj 作为 新对象的原型
const info = createObj(obj);
const info1 = createObj2(obj);
const info2=Object.create(obj)
console.log(info);
console.log(info.__proto__===obj);