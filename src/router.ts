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
  const html = fs.readFileSync(
    path.resolve(__dirname, '../static/login.html'),
    'utf-8'
  )
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
  res.end(html)
})

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body

  if (password !== '123') return res.send('password error')

  const secret = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyzer = CourseAnalyzer.getInstance()
  new Crawler(url, analyzer)

  res.send('get data success')
})

export default router
