'use client'
import { AdminHeader } from '@/components/Headers/AdminHeader'
import Loading from '@/components/Loading/Loading'
import { AdminNavbar } from '@/components/Navbars/AdminNavbar'
import { routes } from '@/lib/routes'
import { userStore } from '@/stores/userStore'
import { ROUTES } from '@/utils/routers'
import {
	AppShell,
	Burger,
	Container,
	Footer,
	MediaQuery,
	Text,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	const router = useRouter()
	const userState = useRecoilValue(userStore)
	const [isSSR, setIsSSR] = useState(false)
	const [opened, setOpened] = useState(false)

	useEffect(() => {
		setIsSSR(true)
	}, [userState])

	if (!isSSR) return null

	if (!userState) {
		router.push(ROUTES.LOGIN)
		return <></>
	}

	return (
		<AppShell
			layout="alt"
			navbar={<AdminNavbar data={routes} hidden={!opened} />}
			navbarOffsetBreakpoint="sm"
			header={
				<AdminHeader
					burger={
						<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								mr="xl"
							/>
						</MediaQuery>
					}
				/>
			}
			footer={
				<Footer height={50} p="md">
					<Text w="full" size="sm" align="center" color="gray">
						Copyright © 2024 Man Tran
					</Text>
				</Footer>
			}
			styles={(theme) => ({
				main: { width: '100%' },
			})}
		>
			<Container fluid px={0}>
				<Loading />
				{children}
			</Container>
		</AppShell>
	)
}

