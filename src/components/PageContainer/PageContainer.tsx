'use client'

import {
	Anchor,
	Breadcrumbs,
	Container,
	ContainerProps,
	Space,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { FC, ReactNode } from 'react'
import classes from './style.module.scss'

type PageContainerProps = {
	children: ReactNode
	title?: string
	px?: number
	items?: { label: string; href: string }[]
} & Pick<ContainerProps, 'fluid'>

export const PageContainer: FC<PageContainerProps> = ({
	children,
	title,
	items,
	fluid = true,
	px,
}) => {
	const theme = useMantineTheme()

	return (
		<div className={classes.container}>
			<Container px={px ?? 0} fluid={fluid}>
				{items && items.length > 0 ? (
					<Breadcrumbs>
						{items.map((item) => (
							<Anchor key={item.label} href={item.href}>
								{item.label}
							</Anchor>
						))}
					</Breadcrumbs>
				) : null}
				{title && (
					<Title order={2} color={theme.colors.dark[6]}>
						{title}
					</Title>
				)}

				<Space h="xl" />

				{children}
			</Container>
		</div>
	)
}
