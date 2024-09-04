import { IUser } from '@/types/models/User'

export const getList = async () => {
	const data: IUser[] = JSON.parse(
		localStorage.getItem('userManagementStore') || '[]',
	)
	return data
}

export const getDetail = async (id: string) => {
	const data: IUser[] = JSON.parse(
		localStorage.getItem('userManagementStore') || '[]',
	)
	return data.find((item: IUser) => item.id === id)
}

export const create = async (body: IUser) => {
	const data: IUser[] = JSON.parse(
		localStorage.getItem('userManagementStore') || '[]',
	)
	const newList: IUser[] = [...data]
	newList.push(body)
	localStorage.setItem('userManagementStore', JSON.stringify(newList))
}

export const update = async (id: string, body: any) => {
	const data: IUser[] = JSON.parse(
		localStorage.getItem('userManagementStore') || '[]',
	)
	const newList = data.map((item: IUser) => {
		if (item.id === id) {
			return { ...item, ...body }
		} else {
			return item
		}
	})
	localStorage.setItem('userManagementStore', JSON.stringify(newList))
}

export const remove = async (id: string) => {
	const data: IUser[] = JSON.parse(
		localStorage.getItem('userManagementStore') || '[]',
	)
	const newList: IUser[] = data.filter((item: IUser) => {
		return item.id !== id
	})
	localStorage.setItem('userManagementStore', JSON.stringify(newList))
}

