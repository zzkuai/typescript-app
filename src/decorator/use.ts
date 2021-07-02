import 'reflect-metadata'
import { RequestHandler } from 'express'
import { CrawlerController, LoginController } from '../controller'

const middlewareArr: RequestHandler[] = []

// 方法装饰器 将中间件注册到类方法上
export function use(middleware: RequestHandler) {
  return function (target: CrawlerController | LoginController, key: string) {
    middlewareArr.push(middleware)
    Reflect.defineMetadata('middlewares', middlewareArr, target, key)
  }
}
