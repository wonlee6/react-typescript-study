import axios, { AxiosRequestConfig } from 'axios'

export const todos = {
  getUserData() {
    const config: AxiosRequestConfig = {
      url: 'https://jsonplaceholder.typicode.com/todos/',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }

    return axios(config)
  },
}
