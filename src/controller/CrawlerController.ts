import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/util'
import { controller, use, get } from '../decorator'
import Analyzer from '../utils/analyzer'
import Crawler from '../utils/crawler'

// 检查是否登录中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = !!req.session?.login
  console.log('checkLogin middleware')

  if (!isLogin) {
    res.json(getResponseData(null, '请先登录'))
  } else {
    next()
  }
}

const test = (req: Request, res: Response, next: NextFunction) => {
  console.log('test middleware')
  next()
}

@controller('/api')
export class CrawlerController {
  @get('/getData')
  @use(checkLogin)
  @use(test)
  getData(req: Request, res: Response) {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyzer = Analyzer.getInstance()
    new Crawler(url, analyzer)

    res.json(getResponseData<ResponseData.getData>(null))
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: Request, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf-8')
      res.json(getResponseData<ResponseData.showData>(JSON.parse(result)))
    } catch (e) {
      res.json(getResponseData<ResponseData.showData>(null, '数据不存在'))
    }
  }
}
