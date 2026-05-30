import { QueryClient } from '@tanstack/react-query'
import { HttpStatusCode, isAxiosError } from 'axios'

const retryCount = 3

// Delay retry
function delayRetry(failureCount: number) {
  return failureCount * 1000 + Math.random() * 1000
}

// Retry
function retry(failureCount: number, error: Error) {
  // Check retry count and is axios error
  if (failureCount > retryCount || !isAxiosError(error)) {
    return false
  }

  // Expired token error
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    // Reset stores
    // useAuthStore.getState().resetStore()
    // useProfileStore.getState().resetStore()

    // Navigate to sign-in page
    // const languageAwarePath = addLanguageToPath({
    //   path: BASE_PATHS.auth.signIn.path
    // })

    // router.navigate(languageAwarePath)
    return false
  }

  // Denied permission error
  if (error.response?.status === HttpStatusCode.Forbidden) {
    return false
  }

  // Only retry for specific server errors
  //   return (
  //     (error.response?.status === HttpStatusCode.InternalServerError &&
  //       error.response?.data.violations?.some((violation) => {
  //         const message = typeof violation.message === 'string' ? violation.message : violation.message[i18n.language]
  //         return ['timeout', 'connect'].some((keyword) => message.includes(keyword))
  //       })) ??
  //     false
  //   )
  return false // Remove this line to enable specific server error retries
}

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData: unknown) => previousData,
      retry,
      retryDelay: delayRetry
    },
    mutations: {
      retry,
      retryDelay: delayRetry
    }
  }
})
