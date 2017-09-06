import ServerConfig from './ServerConfig'
const axios = require('axios')

const serverAddr = ServerConfig.serverUrl()

let instance = axios.create({
  baseURL: serverAddr,
  timeout: 2000
})

export default instance
