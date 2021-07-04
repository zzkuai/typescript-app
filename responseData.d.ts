declare namespace ResponseData {
  interface CourseItem {
    title: string
    count: number
  }
  interface CourseData {
    [key: string]: CourseItem[]
  }

  export type isLogin = boolean
  export type login = null
  export type logout = null
  export type getData = null
  export type showData = null | CourseData
}
