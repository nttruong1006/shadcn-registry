import Axios, { type AxiosRequestConfig } from 'axios'

export const axios = Axios.create({
  baseURL: 'https://gateway.dev.meu-solutions.com/fosco/api',
  validateStatus: (status) => status < 400,
  timeout: 10_000
})

// Request middleware
axios.interceptors.request.use((config) => {
  config.headers.Authorization =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyYzZjMmU3LTE0NmItNDZmOC1iNWJhLTQ5ZWM5ZDMxZjdiZiIsInJvbGVzIjpbIlNZU1RFTV9BRE1JTiJdLCJkZXBhcnRtZW50cyI6WyJTWVNURU1fQURNSU4iLCJET0NVTUVOVCIsIkJPQVJEX09GX0RJUkVDVE9SIiwiU1RPUkFHRSIsIlNFUlZJQ0UiLCJBQ0NPVU5UQU5UIiwiQ09MTEFUT1IiLCJJTlRFUk5BTCIsIklUIiwiU0NBTiJdLCJzc2lkIjoiMDE5YmU5YTUtODE5ZS03YzY5LWIxM2YtY2U0ODZjZDhkNWJmIiwiaWF0IjoxNzY5MTUxNDk2LCJleHAiOjE4MDUyNTQ4ODF9.UBCRJ-nNzoSLlfvAiFRmjf_hSPjPY8BVqPV79Q9YJqEZcZirDwzwRDWc9DCmIAotMdVw5_eCe2oQaYQKi3-hiNPExVm7GE8StWWITKfd89k3xMt3WPnm0S9cfaQvD3ktFN7P4YQVkKK3pGFkAjqYuhltpllTVGaMS_KnHZ8cQO5ZHzESRwwloZj05-73UMuUT2RecJkYDfvbuWWRkNsnuPP9dQ7aTNqEeSXpeaqYkKtDEkMV12Rqrb08cE3BgF9EhsJMllcW_AFEVizF47TkDOufcYsnyOMs2a6R6olHJyv_Kakze0LuGOlxovv5j8QASBmT0Gh9dJA4HemCtddJqg'
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
