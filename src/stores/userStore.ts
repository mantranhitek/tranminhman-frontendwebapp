import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import mockupData from '@/utils/mockupData.json'

const { persistAtom } = recoilPersist()

export const userStore = atom<{ is_login: boolean } | null>({
	key: 'userStore',
	default: null,
	effects_UNSTABLE: [persistAtom],
})

export const userManagementStore = atom<any | null>({
	key: 'userManagementStore',
	default: null,
	effects_UNSTABLE: [persistAtom],
})
