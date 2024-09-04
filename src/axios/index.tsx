import { myStorage } from '@/utils/common'
import Axios from 'axios'
import qs from 'qs'

// Setup Base URL

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,

	paramsSerializer: (params) => {
		const paramString = qs.stringify(params)

		return paramString
	},
})

// Request interceptor
axios.interceptors.request.use(
	(config) => {
		const { get } = myStorage({ stateStore: 'userStore' })
		const currentToken: Partial<any> = get()?.token

		const accessToken = currentToken?.accessToken

		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken || ''}`
		}

		return config
	},
	(error) => Promise.reject(error),
)

// Response interceptor
axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error)
	},
)

export default axios

