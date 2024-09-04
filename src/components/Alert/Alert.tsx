import { rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

export function AlertSuccess(content?: string) {
	return notifications.show({
		withCloseButton: true,
		autoClose: 3000,
		title: 'Success',
		message: content ?? '',
		color: 'teal',
		icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
	})
}

export function AlertError(content?: string) {
	return notifications.show({
		withCloseButton: true,
		autoClose: 3000,
		title: 'Error',
		message: content ?? '',
		color: 'red',
		icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
	})
}
