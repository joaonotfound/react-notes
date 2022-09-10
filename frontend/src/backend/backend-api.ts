import axios, { Axios } from 'axios'
import { env } from 'environment'

export const backendAPI: Axios = axios.create({
  baseURL: `${env.backend_api_url}:${env.backend_api_port}`
})