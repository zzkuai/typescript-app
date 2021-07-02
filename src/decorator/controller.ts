import 'reflect-metadata'
import router from '../router'
import { RequestHandler } from 'express'
import { Methods } from './request'

// 类装饰器 注册类方法路由 控制器
export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )
      const handler = target.prototype[key]
      const middlewareArr: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      )

      if (path && method) {
        const fullPath = root === '/' ? path : root + path
        if (middlewareArr?.length) {
          router[method](fullPath, ...middlewareArr, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
