const a = 1

function getDouble(x: number, y: number) {
  return x * y
}

const num = getDouble(1, 2)

const func = (str: string): number => {
  return parseInt(str)
}

const func1: (str: string) => number = (str) => {
  return parseInt(str)
}

const arr: Array<number> = [1, 2, 3]

// 联合类型
interface Bird {
  fly: Boolean
  sing: () => {}
}
interface Dog {
  fly: boolean
  bark: () => {}
}

type Animal = Bird | Dog

// 类型保护
/// 1. in 语法
function trainAnimal(animal: Animal) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}

/// 2. 类型断言
function trainAnimal2(animal: Animal) {
  if (animal.fly) {
    ;(animal as Bird).sing()
  } else {
    ;(animal as Dog).bark()
  }
}

/// 3. tppeof

/// 4. instanceof
class NumberObj {
  count: number = 0
}

function add(first: Object | NumberObj, second: Object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0
}

// 枚举
enum Status {
  OFFLINE,
  ONLINE,
  DELETED,
}

console.log(Status)

// 泛型 泛指的类型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}
join(1, '2')

interface Item {
  name: string
}
class DataManager<T extends Item> {
  constructor(private data: T[]) {}

  getItem(index: number): string {
    return this.data[index].name
  }
}
const data = new DataManager([
  {
    name: 'zzkuai',
  },
])
console.log(data.getItem(0))

type NumberAndString = number | string
class DataManager2<T extends NumberAndString> {
  constructor(private data: T[]) {}

  getItem(index: number): T {
    return this.data[index]
  }
}
const data2 = new DataManager2([1])
console.log(data.getItem(0))

// keyof
interface User {
  name: string
  age: number
}
// type T = 'name'
// key: 'name'
// Person['name']

class U {
  constructor(private info: User) {}

  // getInfo<T extends keyof User>(key: T): User[T] {
  //   return this.info[key]
  // }

  getInfo(key: keyof User) {
    return this.info[key]
  }
}

const u = new U({
  name: 'zzkuai',
  age: 24,
})

const uname = u.getInfo('name')
console.log(uname)
