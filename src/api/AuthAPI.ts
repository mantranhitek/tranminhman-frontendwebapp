export const login = async (payload: {
	username: string
	password: string
}) => {
	if (
		payload.username === 'mantran@gmail.com' &&
		payload.password === '123456aA@'
	) {
		return true
	} else {
		return false
	}
	// return exportResults(
	// 	await axios.post(API_ROUTES.AUTH_LOGIN_CMS, payload),
	// )
}

