import type UniApp from './types'

type MyConfig = { baseUrl: string } & UniApp.RequestOptions

class MyRequest {
  defaultConfig: MyConfig = {
    baseUrl: '',
    url: '',
    timeout: 5000,
  }
  constructor(baseUrl: string) {
    this.defaultConfig.baseUrl = baseUrl
  }
  request(
    options: UniApp.RequestOptions & { fullUrl?: string }
  ): Promise<UniApp.RequestSuccessCallbackResult> {
    options.url = options.fullUrl
      ? options.fullUrl
      : this.defaultConfig.baseUrl + options.url
    options.timeout = options.timeout || this.defaultConfig.timeout
    if (options.fullUrl) {
      delete options.fullUrl
    }
    return new Promise((resolve, reject) => {
      uni
        .request(options)
        .then((res: UniApp.RequestSuccessCallbackResult) => {
          resolve(res)
        })
        .catch((err: UniApp.RequestSuccessCallbackResult) => {
          reject(err)
        })
    })
  }
  get(options: UniApp.RequestOptions & { fullUrl?: string }) {
    return this.request({ ...options, method: 'GET' })
  }
  post(options: UniApp.RequestOptions & { fullUrl?: string }) {
    return this.request({ ...options, method: 'POST' })
  }
  put(options: UniApp.RequestOptions & { fullUrl?: string }) {
    return this.request({ ...options, method: 'PUT' })
  }
  delete(options: UniApp.RequestOptions & { fullUrl?: string }) {
    return this.request({ ...options, method: 'DELETE' })
  }
}

export default MyRequest
