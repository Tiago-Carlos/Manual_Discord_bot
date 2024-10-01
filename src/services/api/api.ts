import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: 'https://discord.com/api/webhooks/'
}

export const api: AxiosInstance = axios.create(config);