import React, { ReactNode, useEffect, useState } from 'react'
import useSWR, { KeyedMutator } from 'swr'

import { defaultQueryParams, fetchUseSWR } from '@/request/request'
import { Data, RestQueryParams } from '@/types/global'

import * as qs from 'qs'
interface FetcherChildProps<T> {
  data: Data
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  isLoading: boolean
  mutate: KeyedMutator<T>
  hasNextPage: boolean
  loadMore: () => void
}

// Update FetcherProps to use the new FetcherChildProps interface
interface FetcherProps<T> {
  url: string
  sort?: string
  populate?: string | object
  filters?: []
  pagination?: object
  paginationMode?: 'infinite' | 'pagination'
  params?: RestQueryParams
  children: (fetchData: FetcherChildProps<T>) => ReactNode
}

function Fetcher<T>({
  url,
  children,
  params = defaultQueryParams,
  filters,
  paginationMode = 'pagination',
  sort,
  populate,
}: FetcherProps<T>) {
  const [page, setPage] = useState(1)
  const [accumulatedData, setAccumulatedData] = useState<Data>()

  const effectiveFilters = { ...params.filters, ...filters }
  const effectivePopulate = populate || params.populate
  const effectiveSort = sort || params.sort
  const effectiveParams = {
    ...params,
    filters: effectiveFilters,
    sort: effectiveSort,
    populate: effectivePopulate,
    pagination: { ...params.pagination, page: page },
  }

  const queryString = qs.stringify(effectiveParams, {
    encode: false,
    arrayFormat: 'indices',
    allowDots: false,
  })

  const { data, error, mutate } = useSWR<any>(
    `${url}?${queryString}`,
    fetchUseSWR,
    {
      refreshInterval: 30000,
    },
  )

  const hasNextPage =
    data?.meta?.pagination?.page < data?.meta?.pagination?.pageCount && true

  const goToPage = (pageNum: number) => {
    setPage(pageNum)
    // You might need to reset accumulatedData here if you want to start fresh for each page navigation
  }

  useEffect(() => {
    if (data) {
      if (paginationMode === 'infinite') {
        setAccumulatedData((prevData) => {
          return {
            data: prevData ? [...prevData?.data, ...data.data] : [...data.data],
            meta: data.meta,
          }
        })
      } else {
        setAccumulatedData(data)
      }
    }
  }, [data])

  const loadMore = async () => {
    setPage(page + 1)
  }

  if (!accumulatedData) return null
  if (error) return <div>Erreur lors du chargement des données...</div>

  return children({
    data: accumulatedData,
    currentPage: page,
    goToPage,
    isLoading: !data && !error,
    mutate,
    totalPages: data?.meta?.pagination?.pageCount || 0,
    loadMore,
    hasNextPage,
  })
}

export default Fetcher
