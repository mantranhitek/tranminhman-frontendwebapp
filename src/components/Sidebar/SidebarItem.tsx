/* eslint-disable react/jsx-key */
'use client'

import { Box, Group, NavLink, ThemeIcon } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classestyle from './style.module.scss'

interface SidebarItemProps {
	icon: React.FC<any>
	label: string
	link?: string
	initiallyOpened?: boolean
	links?: { label: string; link: string }[]
}

export function SidebarItem({
	icon: Icon,
	label,
	link = '/',
}: SidebarItemProps) {
	const pathname = usePathname()

	return (
		<Group position="apart" spacing={0}>
			<Link href={link} className={classestyle.linkStyle}>
				<NavLink
					label={
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<ThemeIcon variant="light" size={30}>
								<Icon size="1.1rem" />
							</ThemeIcon>
							<Box ml="md">
								<span className={classestyle.customNameSidebar}>{label}</span>
							</Box>
						</Box>
					}
					variant="light"
					active={pathname.includes(link)}
					className={classestyle.customSideBarNoSub}
				></NavLink>
			</Link>
		</Group>
	)
}
