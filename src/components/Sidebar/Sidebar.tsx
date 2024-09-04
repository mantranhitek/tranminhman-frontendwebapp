import { INavItem } from '@/types/models/NavItem'
import { Stack } from '@mantine/core'
import { SidebarItem } from './SidebarItem'

interface Props {
	links: INavItem[]
}
export function Sidebar({ links }: Props) {
	return (
		<Stack w="100%" spacing="lg">
			{links.map((link) => (
				<SidebarItem key={link.label} {...link} {...links} />
			))}
		</Stack>
	)
}

