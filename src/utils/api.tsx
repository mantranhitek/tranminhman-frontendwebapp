export type FilterParams = {
	user_id?: string
	$or?: Array<FilterParams>
	$and?: Array<FilterParams>
	$contains?: Array<FilterParams>
	[key: string]: any
}

export type APIGetParams = {
	fields?: any[]
	where?: FilterParams
	order?: any
	limit?: number
	page?: number
	[key: string]: any
}

export type ResObject<T> = {
	results: {
		objects: {
			result?: T
		}
	}
}

export const exportResults = (res: any) => res.data

export const convertParamsDirectFilter = (params: { [key: string]: any }) => {
	return Object.fromEntries(
		Object.entries(params).map(([key, value]) => {
			if (value instanceof Array || value instanceof Object) {
				return [key, JSON.stringify(value)]
			} else {
				return [key, value]
			}
		}),
	)
}
