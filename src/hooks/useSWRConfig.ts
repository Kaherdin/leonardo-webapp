import { SWRConfiguration } from 'swr'

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  dedupingInterval: 600000,
  focusThrottleInterval: 5000,
  errorRetryCount: 3,
  fetcher: async (url: string) => {
    const res = await fetch(url, {
      headers: {
        'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate',
      },
    })
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      throw error
    }
    return res.json()
  },
}
