import * as fs from 'fs'
import * as path from 'path'
import * as cheerio from 'cheerio' // 类似 jquery
import { Analyzer } from './crawler'

interface Course {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

export default class CourseAnalyzer implements Analyzer {
  private static instance: CourseAnalyzer

  static getInstance() {
    if (!CourseAnalyzer.instance) {
      CourseAnalyzer.instance = new CourseAnalyzer()
    }
    return CourseAnalyzer.instance
  }

  // 获取课程数据
  private getCourceInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Course[] = []
    courseItems.map((_index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      courseInfos.push({ title, count })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos,
    }
  }

  // 生成json文件
  private generateJsonContent(result: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } else {
      fs.mkdirSync(path.resolve(__dirname, '../data'))
    }
    fileContent[result.time] = result.data
    return fileContent
  }

  analyze(html: string, filePath: string) {
    const result = this.getCourceInfo(html)
    const content = this.generateJsonContent(result, filePath)
    return JSON.stringify(content)
  }

  private constructor() {}
}
