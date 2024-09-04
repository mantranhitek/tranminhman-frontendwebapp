'use client'
import * as UserAPI from '@/api/UserAPI'

import { AlertError, AlertSuccess } from '@/components/Alert/Alert'
import { PageContainer } from '@/components/PageContainer'
import { genderList } from '@/lib/constants/userConstant'
import { IUser } from '@/types/models/User'
import { ROUTES } from '@/utils/routers'
import {
	Box,
	Button,
	Grid,
	Select,
	Stack,
	Textarea,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateUser() {
	const router = useRouter()
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const form = useForm<IUser>({
		initialValues: {
			name: '',
			email: '',
			gender: '',
			note: '',
		},
		validate: {
			name: (value) => (!value ? 'Please enter name' : null),
			email: (value) =>
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
					? null
					: 'Invalid email address',
			gender: (value) => (!value ? 'Please select gender' : null),
			note: (value) => (!value ? 'Please enter note' : null),
		},
	})

	const handleSubmit = async (values: IUser) => {
		const newValues: IUser = {
			...values,
			id: randomId(),
			created_at: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
		}
		setIsSubmitted(true)
		try {
			await UserAPI.create(newValues)
			AlertSuccess('Create Success')
			router.push(ROUTES.USERS_MANAGEMENT)
		} catch (error) {
			setIsSubmitted(false)
			AlertError(error?.response?.data?.message)
		}
	}

	return (
		<PageContainer title="Create New User">
			<Box maw={'80%'} mx="auto">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack>
						<Grid gutterLg={100}>
							<Grid.Col span={6}>
								<TextInput
									size="md"
									radius="sm"
									label="Name"
									placeholder="Please enter name"
									withAsterisk
									{...form.getInputProps('name')}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<TextInput
									size="md"
									radius="sm"
									label="Email"
									placeholder="Please enter email"
									withAsterisk
									{...form.getInputProps('email')}
								/>
							</Grid.Col>
						</Grid>

						<Grid gutterLg={100}>
							<Grid.Col span={6}>
								<Select
									data={genderList}
									label="Gender"
									size="md"
									placeholder="Please select gender"
									withAsterisk
									{...form.getInputProps('gender')}
								/>
							</Grid.Col>
						</Grid>

						<Textarea
							size="md"
							label="Note"
							placeholder="Please introduce yourself"
							withAsterisk
							{...form.getInputProps('note')}
						/>

						<Grid>
							<Grid.Col span={6}>
								<Button
									onClick={() => router.push(ROUTES.USERS_MANAGEMENT)}
									variant="light"
								>
									Cancel
								</Button>
							</Grid.Col>
							<Grid.Col
								span={6}
								style={{ display: 'flex', justifyContent: 'end' }}
							>
								<Button type="submit" disabled={isSubmitted}>
									Save
								</Button>
							</Grid.Col>
						</Grid>
					</Stack>
				</form>
			</Box>
		</PageContainer>
	)
}

