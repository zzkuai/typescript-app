import * as fs from 'fs'
import * as path from 'path'
import * as superagent from 'superagent' // 请求库
import CourseAnalyzer from './courseAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crawler {
  private filePath = path.resolve(__dirname, '../data/course.json')

  // 获取页面html内容
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  // 将数据写入文件
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  // 初始化
  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const content = this.analyzer.analyze(html, this.filePath)
    this.writeFile(content)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

export default Crawler
