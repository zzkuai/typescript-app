import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import Analyzer from './utils/analyzer'
import Crawler from './utils/crawler'
import { getResponseData } from './utils/util'

// 扩展原有类型
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

// 检查是否登录中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (!isLogin) return res.json(getResponseData(null, '请先登录'))

  next()
}

const router = Router()

router.get('/', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session?.login
  const page = isLogin ? 'logout.html' : 'login.html'
  const html = fs.readFileSync(
    path.resolve(__dirname, `../static/${page}`),
    'utf-8'
  )

  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
  res.end(html)
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }

  res.json(getResponseData(null))
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session?.login

  if (isLogin) {
    res.json(getResponseData(null, '用户已登录'))
  } else {
    if (password !== '123') return res.json(getResponseData(null, '登录失败'))

    if (req.session) {
      req.session.login = true
      res.json(getResponseData(null))
    }
  }
})

router.get('/getData', checkLogin, (req: Request, res: Response) => {
  const secret = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyzer = Analyzer.getInstance()
  new Crawler(url, analyzer)

  res.json(getResponseData(null))
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf-8')
    res.json(getResponseData(JSON.parse(result)))
  } catch (e) {
    res.json(getResponseData(null, '数据不存在'))
  }
})

export default router
