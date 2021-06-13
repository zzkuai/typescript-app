import fs from 'fs'
import path from 'path'
import { Router, Request, Response } from 'express'
import CourseAnalyzer from './courseAnalyzer'
import Crawler from './crawler'

// 扩展原有类型
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session?.login
  let html

  if (isLogin) {
    html = fs.readFileSync(
      path.resolve(__dirname, '../static/logout.html'),
      'utf-8'
    )
  } else {
    html = fs.readFileSync(
      path.resolve(__dirname, '../static/login.html'),
      'utf-8'
    )
  }

  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
  res.end(html)
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }

  res.redirect('/')
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session?.login

  if (isLogin) {
    res.send('历史用户 登录成功')
  } else {
    if (password !== '123') return res.send('登录失败')

    if (req.session) {
      req.session.login = true
      res.send('登录成功')
    }
  }
})

router.get('/getData', (req: Request, res: Response) => {
  const isLogin = req.session?.login

  if (!isLogin) return res.send('请先登录')

  const secret = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyzer = CourseAnalyzer.getInstance()
  new Crawler(url, analyzer)

  res.send('数据爬取成功')
})

router.get('/showData', (req: Request, res: Response) => {
  const isLogin = req.session?.login
  if (!isLogin) return res.send('请先登录')
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf-8')
    res.json(JSON.parse(result))
  } catch (e) {
    res.send('尚未爬取到数据')
  }
})

export default router
