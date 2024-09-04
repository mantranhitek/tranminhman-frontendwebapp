/* eslint-disable react/display-name */
'use client'

import { userStore } from '@/stores/userStore'
import { ROUTES } from '@/utils/routers'
import { Center, Container } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
	children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
	const userState = useRecoilValue(userStore)
	const [isSSR, setIsSSR] = useState(false)

	const router = useRouter()
	useEffect(() => {
		setIsSSR(true)
	}, [userState])

	if (!isSSR) return null
	if (userState) {
		return router.push(ROUTES.DASHBOARD)
	}

	return (
		<div style={{ background: '#f2f3f5' }}>
			<Center
				sx={() => ({
					height: '100vh',
				})}
			>
				<Container fluid w={350}>
					{children}
				</Container>
			</Center>
		</div>
	)
}

