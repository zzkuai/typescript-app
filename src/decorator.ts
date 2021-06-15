/**
 * 装饰器
 * 装饰器本身是一个函数 类声明完成则立即执行
 * 通过 @ 符号使用
 */

/**
 * 类装饰器
 * @param constuctor 构造函数
 */
function testDecorator(constuctor: any) {
  // console.log(constuctor)
}

/**
 * 类内部方法装饰器
 * @param target      普通方法-类的原型对象prototype 静态方法-类的构造函数constructor
 * @param key         方法名称
 * @param descriptor  要定义或修改的属性描述符
 */
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // console.log(target)
  // console.log(key)
  // console.log(descriptor)
}

/**
 * 访问器装饰器
 * @param target      普通方法-类的原型对象prototype 静态方法-类的构造函数constructor
 * @param key         方法名称
 * @param descriptor  要定义或修改的属性描述符
 */
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // console.log(target)
}

/**
 * 属性装饰器
 * @param target  类的原型对象prototype
 * @param key     属性名称
 */
function propDecorator(target: any, key: string) {
  // console.log(target)
  // console.log(key)
  target[key] = 'decorator name'
}

/**
 * 方法参数装饰器
 * @param target      类的原型对象prototype
 * @param key         方法名称
 * @param paramIndex  参数所在索引
 */
function paramDecorator(target: any, key: string, paramIndex: number) {
  // console.log(target)
  // console.log(key)
  // console.log(paramIndex)
}

@testDecorator
class Test {
  @propDecorator
  name: string

  private _age: number
  constructor(name: string, age: number) {
    this.name = name
    this._age = age
  }

  @getNameDecorator
  getName() {
    return this.name
  }

  @getNameDecorator
  static getStaticName() {
    return 'zzkuai'
  }

  get age() {
    return this._age
  }

  @visitDecorator
  set age(age: number) {
    this._age = age
  }

  getInfo(@paramDecorator name: string) {
    this.name = name
  }
}

const test = new Test('kay', 24)
// test.name = 'new name'
// console.log(test.name)
// console.log((test as any).__proto__.name)

/**
 * 使用示例
 */
function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
      try {
        fn()
      } catch (e) {
        console.log(msg)
      }
    }
  }
}

const userInfo: any = undefined
class UserInfo {
  @catchError('userinfo.name 不存在')
  getName() {
    return userInfo.name
  }

  @catchError('userinfo.age 不存在')
  getAge() {
    return userInfo.age
  }
}

const us = new UserInfo()
console.log(us.getName())
console.log(us.getAge())
