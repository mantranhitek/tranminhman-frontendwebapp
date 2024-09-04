import { atom } from 'recoil'

export const loadingStore = atom<boolean>({
	key: 'loadingStore',
	default: false,
})
