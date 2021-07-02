import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { getResponseData } from '../utils/util'
import { controller, get, post } from '../decorator'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/')
export class LoginController {
  @post('/login')
  login(req: RequestWithBody, res: Response) {
    const { password } = req.body
    const isLogin = !!req.session?.login

    if (isLogin) {
      res.json(getResponseData(null, '用户已登录'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.json(getResponseData(null))
      } else {
        res.json(getResponseData(null, '登录失败'))
      }
    }
  }

  @get('/logout')
  logout(req: RequestWithBody, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }

    res.json(getResponseData(null))
  }

  @get('/')
  home(req: RequestWithBody, res: Response) {
    const isLogin = !!req.session?.login
    const page = isLogin ? 'logout.html' : 'login.html'
    const html = fs.readFileSync(
      path.resolve(__dirname, `../../static/${page}`),
      'utf-8'
    )

    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
    res.end(html)
  }
}
