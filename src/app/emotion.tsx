'use client'

import '@/styles/global.css'
import { theme } from '@/styles/theme'
import { CacheProvider } from '@emotion/react'
import { MantineProvider, useEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { usePathname, useServerInsertedHTML } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

export default function RootStyleRegistry({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const cache = useEmotionCache()
	cache.compat = true

	useServerInsertedHTML(() => (
		<style
			data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
			dangerouslySetInnerHTML={{
				__html: Object.values(cache.inserted).join(' '),
			}}
		/>
	))

	useEffect(() => {
		let bodyElm = document.getElementsByTagName('body')[0]
		if (bodyElm.style.overflow === 'hidden') {
			bodyElm.style.overflow = 'unset'
		}
	}, [pathname])

	return (
		<RecoilRoot>
			<CacheProvider value={cache}>
					<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
						<ModalsProvider>
							<Suspense fallback="...loading">{children}</Suspense>
						</ModalsProvider>
						<Notifications />
					</MantineProvider>
			</CacheProvider>
		</RecoilRoot>
	)
}
