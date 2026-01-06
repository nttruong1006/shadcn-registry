import Axios, { type AxiosRequestConfig } from 'axios'

export const axios = Axios.create({
  baseURL: 'https://gateway.dev.meu-solutions.com/fosco/api',
  validateStatus: (status) => status < 400,
  timeout: 10000
})

// Request middleware
axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOWE1MmY0LTVmNDktNzE2OC05ZjI4LWU2NDRlYzFlYTQ4MiIsInJvbGVzIjpbIkFETUlOIl0sImRlcGFydG1lbnRzIjpbIlNZU1RFTV9BRE1JTiIsIkJPQVJEX09GX0RJUkVDVE9SIiwiRE9DVU1FTlQiLCJTVE9SQUdFIiwiU0VSVklDRSIsIkFDQ09VTlRBTlQiLCJDT0xMQVRPUiIsIklOVEVSTkFMIiwiSVQiLCJTQ0FOIiwiUkVDUlVJVE1FTlQiXSwic3NpZCI6IjAxOWI5MTc1LTRkYTEtN2QxYi1hZGRlLTUzN2ZhZTViNDg2NyIsImlhdCI6MTc2NzY3MTk0MiwiZXhwIjoxODE0NTI5MzczfQ.jYmXLV6ILLVcPxcZJ8ebl2-vGsFSOjRwr0n5zy06zFIKteZYjTJkvrtxxjZPW0QJQpd76Mm8Pmap_4YzgRlN2caWkitfvpKZphGqC6bwJAF9FSyWPOdLv6eI5ydzEHJV9sSg9VzYeb6EfHS8DlxFEVeefiIX9hVtOUVu4tRdlybgN1eU5LPBuMkfKMg2Lr6QpUNgu1dX3QEJ-ImsTiIWnMs8MOmXFY8KOAwY7pD0ufRDz9rkgDMws2b3KDzZjbT37drRxmo9zLFlikKMbpRmmIfF50sTWu8FtOXoTAZ3jK4zTCSf06bcc05d3LkcYUxs3Ph5mAZ6acA9TQblNtMeoQ`
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
