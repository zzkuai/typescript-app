import React from 'react'
import { Button } from 'antd'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './index.css'

interface State {
  isLogin: boolean
  isLoaded: boolean
}

class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLogin: true,
      isLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          isLoaded: true,
        })
      } else {
        this.setState({
          isLoaded: true,
        })
      }
    })
  }

  handleLogout = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data.success) {
        this.setState({
          isLogin: false,
        })
      }

      this.setState({
        isLoaded: true,
      })
    })
  }

  render() {
    const { isLogin, isLoaded } = this.state
    if (!isLoaded) {
      return null
    }

    if (!isLogin) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-page">
        <Button type="primary">爬取</Button>
        <Button type="primary">展示</Button>
        <Button type="primary" onClick={this.handleLogout}>
          退出
        </Button>
      </div>
    )
  }
}

export default Home
