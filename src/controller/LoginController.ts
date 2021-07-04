// import fs from 'fs'
// import path from 'path'
import { Request, Response } from 'express'
import { getResponseData } from '../utils/util'
import { controller, get, post } from '../decorator'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/api')
export class LoginController {
  @get('/isLogin')
  isLogin(req: RequestWithBody, res: Response) {
    const isLogin = !!req.session?.login
    res.json(getResponseData<ResponseData.isLogin>(isLogin))
  }

  @post('/login')
  login(req: RequestWithBody, res: Response) {
    const { password } = req.body

    if (password !== '123') {
      res.json(getResponseData<ResponseData.login>(null, '密码错误，登录失败'))
    }

    if (req.session) {
      req.session.login = true
      res.json(getResponseData<ResponseData.login>(null))
    }
  }

  @get('/logout')
  logout(req: RequestWithBody, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }

    res.json(getResponseData<ResponseData.logout>(null))
  }

  // @get('/')
  // home(req: RequestWithBody, res: Response) {
  //   const isLogin = !!req.session?.login
  //   const page = isLogin ? 'logout.html' : 'login.html'
  //   const html = fs.readFileSync(
  //     path.resolve(__dirname, `../../static/${page}`),
  //     'utf-8'
  //   )

  //   res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
  //   res.end(html)
  // }
}
