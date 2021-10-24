// class Person{
//   constructor(name, age) {
    
//     this._name = name;
//     this.age=age
//   }
//   running() {
//     console.log(this.name+' running');
//   }
//   get name() {
//     return this._name
//   }
//   set name(value) {
//     this._name=value
//   }
//    static personStatic() {
//     console.log('personStatic');
//   }

// }
// class Student extends Person{
//   constructor(name, age, sno) {
//       super(name,age);
//       this.sno=sno
//   }
//   running() {
//     super.running();
//     console.log('我是学生');
//   }
// }
//babel转译后
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _inherits(subClass, superClass) {
  //条件判断 superClass必须为function或为null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  //subClass的prototype等于superClass.prototype
  //并添加constructor属性，value指向subClass自身
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  //把subClass.__proto__设置为superClass并返回
  //目的：继承静态方法
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  //是否支持Object.setPrototypeOf
  //不支持则polyfill 把o.__proto__设置为P并返回
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  //是否支持Reflect
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    //Student.__proto__ 指向的是Person
    var Super = _getPrototypeOf(Derived),
      result; 
    if (hasNativeReflectConstruct) {
      //之后会执行call(this,...),this指向的是Student(子类),
      var NewTarget = _getPrototypeOf(this).constructor;
      console.log(NewTarget===Super.constructor);//true
      console.log(NewTarget);//Person{}
      // Super=Person  父类
      //arguments:参数
      //newTarget:Student 子类
      //通过super创造出来一个实例，实例的原型的constructor指向newTarget
      //通过Person创造出来一个实例，实例的原型的constructor指向Person
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      //如果不支持Relact 则直接使用apply
      //Person
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
//边界处理
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}
//边界处理
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
//判断是否支持Reflect
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}
//获取__proto__
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
//使类不能通过非new调用
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
//添加方法具体方法
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
//添加公共方法和静态方法
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
//创建person类
var Person = /*#__PURE__*/ (function () {
  "use strict";

  function Person(name, age) {
    _classCallCheck(this, Person);

    this._name = name;
    this.age = age;
  }

  _createClass(
    Person,
    [
      {
        key: "running",
        value: function running() {
          console.log(this.name + " running");
        }
      },
      {
        key: "name",
        get: function get() {
          return this._name;
        },
        set: function set(value) {
          this._name = value;
        }
      }
    ],
    [
      {
        key: "personStatic",
        value: function personStatic() {
          console.log("personStatic");
        }
      }
    ]
  );

  return Person;
})();
//实现继承person 
var Student = /*#__PURE__*/ (function (_Person) {
  "use strict";
  //把A置于B的原型链上并返回 并继承Person的静态方法
  //寄生式继承  Student.__proto__ = _Person;
  _inherits(Student, _Person);
  //拿到super
  var _super = _createSuper(Student);
  //构造函数
  function Student(name, age, sno) {
    var _this;

    _classCallCheck(this, Student);
    //由于_classCallCheck(this, Student)的缘故 不能使用person.call
    // stu=new Student()   this指向的是stu对象
    _this = _super.call(this, name, age);
    //_this:创建出来的新实例对象 stu
    _this.sno = sno;
    return _this;
  }

  _createClass(Student, [
    {
      key: "running",
      value: function running() {
        _get(_getPrototypeOf(Student.prototype), "running", this).call(this);

        console.log("我是学生");
      }
    }
  ]);

  return Student;
})(Person);
const stu = new Student('lyj',18)
console.log(Student.__proto__===Person);
console.log(stu.__proto__);