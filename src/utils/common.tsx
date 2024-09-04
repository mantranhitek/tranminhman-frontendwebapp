import { PERSIST_KEY } from '@/lib/constants/storage'

export const myStorage = ({ storageKey = PERSIST_KEY, stateStore }) => {
	const get = () => {
		const state = localStorage.getItem(storageKey)

		if (stateStore) {
			//Return object store
			return state && JSON.parse(state)[stateStore]
		} else {
			//Return local key object
			return state && JSON.parse(state)
		}
	}

	return { get }
}
