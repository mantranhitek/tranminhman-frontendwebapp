import { INavItem } from '@/types/models/NavItem'
import { ROUTES } from '@/utils/routers'
import { IconDeviceDesktop, IconUser } from '@tabler/icons-react'

export const routes: INavItem[] = [
	{
		label: 'Dashboard',
		icon: IconDeviceDesktop,
		link: ROUTES.DASHBOARD,
	},
	{
		label: 'Users Management',
		icon: IconUser,
		link: ROUTES.USERS_MANAGEMENT,
	},
]

