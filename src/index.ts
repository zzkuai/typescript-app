import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import router from './router'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

app.listen(3000, () => {
  console.log('server is running')
})
