import type UniApp from './types'

type MyConfig = { baseUrl: string } & UniApp.RequestOptions

class MyRequest {
  static defaultConfig: MyConfig = {
    baseUrl: '',
    url: '',
    timeout: 5000,
  }
  static success(response: any) {
    return response
  }
  static
  request(options: UniApp.RequestOptions & { fullUrl?: string }) {
    options.url = options.fullUrl
      ? options.fullUrl
      : this.defaultConfig.baseUrl + options.url
    options.timeout = options.timeout || this.defaultConfig.timeout
    options.timeout = options.timeout || this.defaultConfig.timeout
    options.timeout = options.timeout || this.defaultConfig.timeout
    return new Promise((resolve, reject) => {
      uni.request(options)
    })
  }
}

export default MyRequest
