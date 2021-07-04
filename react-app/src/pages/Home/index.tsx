import React from 'react'
import { Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import moment from 'moment'
import axios from 'axios'
import './index.css'

interface CourseItem {
  title: string
  count: number
}
interface CourseData {
  [key: string]: CourseItem[]
}

interface SerieItem {
  name: string
  type: string
  stack: string
  data: number[]
}

interface State {
  isLogin: boolean
  isLoaded: boolean
  data: CourseData
}

class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLogin: true,
      isLoaded: false,
      data: {},
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

    axios.get('/api/showData').then((res) => {
      if (res.data.success) {
        this.setState({
          data: res.data.data,
        })
      } else {
        message.error(res.data.errMsg)
      }
    })
  }

  handleCrawler = () => {
    axios.get('/api/getData').then((res) => {
      if (res.data.success) {
        message.success('爬取成功')
      } else {
        message.error(res.data.errMsg)
      }
    })
  }

  getOption: () => EChartsOption = () => {
    const { data } = this.state
    let legendData: string[] = []
    let times: string[] = []
    let tempData: {
      [key: string]: number[]
    } = {}

    for (let i in data) {
      const item = data[i]
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      item.forEach((innerItem) => {
        const { title, count } = innerItem
        if (!legendData.includes(title)) {
          legendData.push(title)
        }

        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count])
      })
      // seriesData = item.map(item => {
      //   return {
      //     name: item.title,
      //     type:'line',
      //     stack:'总人数',
      //     data:
      //   }
      // })
    }

    const seriesData = Object.keys(tempData).map((item) => {
      return {
        name: item,
        type: 'line',
        data: tempData[item],
      }
    })

    return {
      title: {
        text: '课程在线学习人数',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    }
  }

  handleLogout = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data.success) {
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
        <div className="buttons">
          <Button type="primary" onClick={this.handleCrawler}>
            爬取
          </Button>
          <Button type="primary" onClick={this.handleLogout}>
            退出
          </Button>
        </div>

        <ReactECharts option={this.getOption()} />
      </div>
    )
  }
}

export default Home
