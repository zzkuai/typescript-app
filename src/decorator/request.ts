import 'reflect-metadata'
import { CrawlerController, LoginController } from '../controller'

export enum Methods {
  get = 'get',
  post = 'post',
}

// 生成对应请求方法的工厂函数
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: CrawlerController | LoginController, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

// get 方法注册路径
export const get = getRequestDecorator(Methods.get)

// post 方法注册路径
export const post = getRequestDecorator(Methods.post)
