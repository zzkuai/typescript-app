/**
 * cdn引入jquery文件声明
 */

// 声明全局变量
// declare var $: (param: () => void) => void

// 声明全局方法
interface JQueryInstance {
  html: (html: string) => JQueryInstance
}

// 函数重载
declare function $(readyFunc: () => void): void
declare function $(selector: string): JQueryInstance

// 声明全局对象
declare namespace $ {
  namespace fn {
    class init {}
  }
}

// 使用 interface 语法实现函数重载
// interface JQuery {
//   (readyFunc: () => void): void
//   (selector: string): JQueryInstance
// }
// declare var $: JQuery

/**
 * es6 模块化声明
 * 外部使用到的变量函数必须导出
 */

declare module 'jquery' {
  interface JQueryInstance {
    html: (html: string) => JQueryInstance
  }

  function $(readyFunc: () => void): void
  function $(selector: string): JQueryInstance

  namespace $ {
    namespace fn {
      class init {}
    }
  }

  export = $
}
