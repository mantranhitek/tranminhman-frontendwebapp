import { loadingStore } from '@/stores/loadingStore'
import { LoadingOverlay } from '@mantine/core'
import { useRecoilValue } from 'recoil'
import classes from './style.module.scss'

export default function Loading() {
	const loadingState = useRecoilValue(loadingStore)

	return loadingState ? (
		<div className={classes.loadingCustom}>
			<LoadingOverlay
				loaderProps={{ color: 'indigo' }}
				overlayOpacity={1}
				overlayColor="#fff"
				visible
			/>
		</div>
	) : (
		<></>
	)
}
