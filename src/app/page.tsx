'use client'

import classes from './style.module.scss'
import { Flex } from '@mantine/core'

export default function Page() {
	return (
		<Flex direction="column">
			<div className={classes.landingPage}>
				<h1>Hitek Software</h1>
			</div>
		</Flex>
	)
}
