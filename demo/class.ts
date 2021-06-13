class Person {
  readonly height: number = 171
  protected uname: string
  private _age: number = 24
  getName() {
    return this.uname
  }
  get age() {
    return this._age
  }
  set age(age: number) {
    if (age < 1) throw new Error('错误年龄')
    this._age = age
  }

  constructor(uname: string) {
    this.uname = uname
  }
}

class Teacher extends Person {
  constructor(public name: string, public gender: string) {
    super(name)
  }

  getTeacher() {
    return this.uname + ' is ' + this.gender
  }
}

const person = new Person('kay')
console.log(person.getName())
console.log(person.age)
person.age = 12
console.log(person.age)
person.age = 0
console.log(person.age)

const teacher = new Teacher('kay', 'male')
console.log(teacher.getTeacher())

// 单例模式
class Demo {
  private static instance: Demo
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo()
    }
    return this.instance
  }
}
