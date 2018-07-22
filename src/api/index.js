import axios from 'axios'

const apiUrl = 'https://kitsu.io/api/edge/anime'

export default {
  getList({ filters }) {
    return axios.get(apiUrl, { params: { filters } })
  },
  getItem({ id }) {
    return axios.get(`${apiUrl}/${id}`)
  }
}
