
const obj={
    name:'why',
    age:18
}

function createObj(obj) {
    const newObj={};
    Object.setPrototypeOf(newObj,obj);
    return newObj
}


const info=createObj(obj);
console.log(info);
console.log(info.__proto__===obj);