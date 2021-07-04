interface Result<T> {
  success: boolean
  errMsg?: string
  data: T
}

export const getResponseData = <T>(data: any, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    }
  } else {
    return {
      success: true,
      data,
    }
  }
}
