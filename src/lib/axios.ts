import Axios, { type AxiosRequestConfig } from 'axios'

export const axios = Axios.create({
  baseURL: 'https://gateway.dev.meu-solutions.com/fosco/api',
  timeout: 10_000,
  validateStatus: (status) => status < 400
})

// Request middleware
axios.interceptors.request.use((config) => {
  config.headers.Authorization =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyYzZjMmU3LTE0NmItNDZmOC1iNWJhLTQ5ZWM5ZDMxZjdiZiIsInJvbGVzIjpbIlNZU1RFTV9BRE1JTiJdLCJkZXBhcnRtZW50cyI6WyJTWVNURU1fQURNSU4iLCJET0NVTUVOVCIsIkJPQVJEX09GX0RJUkVDVE9SIiwiU1RPUkFHRSIsIlNFUlZJQ0UiLCJBQ0NPVU5UQU5UIiwiQ09MTEFUT1IiLCJJTlRFUk5BTCIsIklUIiwiU0NBTiJdLCJzc2lkIjoiMDE5ZGFhNTItMGI1ZC03ZjEzLTliZmUtOTEzYzkzYWZkNzYxIiwiaWF0IjoxNzc2Njc4OTk2LCJleHAiOjE4MDIwODIxNDB9.DL4mqjmdHKQMUogHoUqmgndT7maidCo6GQB9FLHzFCtHVMkyExGUUYIs5ERp_v8iXbmS3EDyBSmGsNNpDRFQxocU3Nkn3sdVMnHbJQ1xuXgTTsMY9lD6VTJTH8iTf7NZPUt_Kfjrl9j2G0icMhl8DVMVp79ytAuEwyET1PUEKzi10aeszCRE4lWoGyt1ZIEQDYUAm5fnZlZvUoJHQklDk3kSkCURIgJMHhX-Yq-3vSrD7mWoqUeWU-1OgwXaRXcnvwe94taFVMasLfIzuW1a0JPvNbJzzstVfW7LQkDwgzCVdmn9o6xeEt29YwUf9m-29PpFX-9Vn19IHjO9N2JaYw'
  // config.headers.Authorization = `Bearer ${useAuthStore.getState().token}`
  //   config.headers['Accept-Language'] = i18n.language
  return config
})

// Response middleware
axios.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error)
)

// Execute axios
export const executeAxios = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = axios<T>({
    ...config,
    ...options
  }).then(({ data, status }) => (data instanceof Blob ? data : { ...data, statusCode: status }))

  // @ts-expect-error not exist cancel
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}
