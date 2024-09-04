import { Flex, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
interface Props {
	width?: string
	height?: string
}

export const Logo: React.FC<Props> = ({ width, height }) => {
	const router = useRouter()

	return (
		<Flex direction="row" align="center" gap={4}>
			<Title
				style={{ cursor: 'pointer' }}
				onClick={() => {
					router.push('/')
				}}
				order={4}
			>
				MoovTek Test
			</Title>
		</Flex>
	)
}
