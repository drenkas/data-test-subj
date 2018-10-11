import axios from 'axios'

export const getFetch = (url) => {
  return axios.get(url)
}

export const postForm = (url, payload) => {
  return axios.post(url, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}