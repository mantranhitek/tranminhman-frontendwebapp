/* eslint-disable react/display-name */
import { Flex, Header } from '@mantine/core'
import React from 'react'

interface Props {
	burger?: React.ReactNode
}

export function AdminHeader({ burger }: Props) {
	return (
		<Header height={72} px="lg" withBorder={true}>
			<Flex direction="row" h={72} align="center" gap={8}>
				{burger && burger}
			</Flex>
		</Header>
	)
}
