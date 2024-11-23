import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { BaseData, RestQueryParams } from '@/types/global'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337'
axios.defaults.baseURL = `${API_URL}/api`

export const defaultQueryParams: RestQueryParams = {
  sort: 'id:desc',
  populate: '*',
  publicationState: 'preview',
  pagination: {
    page: 1,
    pageSize: 10,
  },
}
export async function fetchUseSWR(
  path: string,
  userToken?: string | null,
): Promise<BaseData> {
  const headers: any = {}

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }
  try {
    const response = await axios.get(`${path}`, { headers })

    return response.data
  } catch (err) {
    console.error(err, 'fetchUseSWR fetching error, path:', path)
    throw err
  }
}

export async function fetchAxiosAPI(
  path: string,
  params = defaultQueryParams,
  userToken?: string | null,
) {
  const headers: any = {}

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }
  try {
    const response = await axios.get(`${path}`, { headers, params })
    return response.data
  } catch (err) {
    console.error(err, 'fetchAxiosAPI fetching error, path:', path)
  }
}

// export async function postAxiosApiFormData(
//   path: string,
//   data: FormData,
//   userToken?: string | null
// ) {
//   const headers = {
//     "Content-Type": "multipart/form-data",
//   } as AxiosRequestHeaders;
//   if (userToken) {
//     headers.Authorization = `Bearer ${userToken}`;
//   }
//   try {
//     const response = await axios.post(path, data, { headers });
//     return response;
//   } catch (err) {
//     console.error(err, "Axios Post error, path:", path);
//     throw err;
//   }
// }

export async function postAxiosAPI<T = any>(
  path: string,
  data: FormData | Record<string, unknown>,
  userToken?: string | null,
): Promise<AxiosResponse<T>> {
  const headers = {} as AxiosRequestHeaders
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }

  // TODO: I'm not sure it's needed....
  // if ( data instanceof FormData) {
  //   headers['Content-Type'] = 'multipart/form-data'
  // }

  try {
    const response = await axios.post<T>(path, data, { headers })
    return response
  } catch (err) {
    console.error('Axios Post error, path:', path, err)
    throw err
  }
}

export async function putAxiosAPI<T = any>(
  path: string,
  data: FormData | Record<string, unknown>,
  userToken?: string | null,
): Promise<AxiosResponse<T>> {
  const headers: AxiosRequestHeaders = {} as AxiosRequestHeaders

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }

  try {
    const response = await axios.put<T>(path, data, { headers })
    return response
  } catch (err) {
    console.error('Axios Post error, path:', path, err)
    throw err
  }
}

// export async function putAxiosAPIFormData(
//   path: string,
//   data: any,
//   userToken?: string | null
// ) {
//   // const headers: any = {};

//   const headers: any = {
//     "Content-Type": "multipart/form-data",
//   };

//   if (userToken) {
//     headers.Authorizationa = `Bearer ${userToken}`;
//   }
//   try {
//     const response = await axios.put(path, data, { headers });
//     return response;
//   } catch (err) {
//     console.error(err, "Axios PUT error");
//     throw err;
//   }
// }

export async function deleteAxiosAPI(path: string, userToken?: string | null) {
  const headers: any = {}

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }

  try {
    const response = await axios.delete(path, { headers })
    return response
  } catch (err) {
    console.error(err, 'Axios Delete error, path:', path)
    throw err
  }
}
