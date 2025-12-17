import Axios, { type AxiosRequestConfig } from 'axios'

export const axios = Axios.create({
  baseURL: 'https://gateway.dev.meu-solutions.com/fosco/api',
  validateStatus: (status) => status < 400,
  timeout: 10000
})

// Request middleware
axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOWE1MmY0LTVmNDktNzE2OC05ZjI4LWU2NDRlYzFlYTQ4MiIsInJvbGVzIjpbIkFETUlOIl0sImRlcGFydG1lbnRzIjpbIlNZU1RFTV9BRE1JTiIsIkJPQVJEX09GX0RJUkVDVE9SIiwiRE9DVU1FTlQiLCJTVE9SQUdFIiwiU0VSVklDRSIsIkFDQ09VTlRBTlQiLCJDT0xMQVRPUiIsIklOVEVSTkFMIiwiSVQiLCJTQ0FOIiwiUkVDUlVJVE1FTlQiXSwic3NpZCI6IjAxOWIyNTVkLTAyYWItNzg0NC1iZmZjLWEyODg2YTljMTkxYSIsImlhdCI6MTc2NTg1ODQxMSwiZXhwIjoxODExODQ3MTY2fQ.Ze1d0se-KNhj-B5twlF-q7YI9eScJ0gBhZFbKfKd0EFyq4pkWu2-nLvirJ32nXdoeL66bETgFTietphjOypcTvws77-Qh5Zj1i-TlFVR3cReOwjOnG65T4xVFi8NrDdF17ChqMSsd8ATUQX_IV4nYbJ3cyVqW-O_8mf3jXdLu_I1c31c9uCcCbgcWz8vUeOP9984sC9WpFPci2aCWEeJJRh7y8gM5ZcY-Ei4950XMBGudqdrWynWhkc1zgcudQPVw4fPq5eiQEAR7yUXDXnFUDq1MabbBwsdksHk7HUZvegxBNBkB02Jv101_7zlysbx5YJ63v3ErOjLxRxI24fo9g`
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
  }).then(({ data, status }) => {
    return data instanceof Blob ? data : { ...data, statusCode: status }
  })

  // @ts-expect-error not exist cancel
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}
