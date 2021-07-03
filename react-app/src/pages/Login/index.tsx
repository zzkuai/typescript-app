import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import './index.css'

interface FormFields {
  password: string
}

interface Props {
  form: WrappedFormUtils<FormFields>
}

class Login extends React.Component<Props> {
  state = {
    isLogin: false,
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(
            '/api/login',
            qs.stringify({
              password: values.password,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              this.setState({
                isLogin: true,
              })
            } else {
              message.error(res.data?.errMsg || '登录失败')
            }
          })
      }
    })
  }

  render() {
    const { isLogin } = this.state
    const { getFieldDecorator } = this.props.form

    if (isLogin) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入登录密码！' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login)

export default LoginForm
