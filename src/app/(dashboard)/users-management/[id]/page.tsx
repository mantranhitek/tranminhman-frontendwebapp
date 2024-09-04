'use client'

import * as UserAPI from '@/api/UserAPI'
import { PageContainer } from '@/components/PageContainer'

import {
	Box,
	Button,
	Flex,
	Grid,
	Select,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AlertError, AlertSuccess } from '@/components/Alert/Alert'
import { genderList } from '@/lib/constants/userConstant'
import { IUser } from '@/types/models/User'
import { ROUTES } from '@/utils/routers'

export default function NoticeDetailPage() {
	const router = useRouter()
	const { id } = useParams()
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

	// handle function
	const handleFetchData = async () => {
		try {
			const res = await UserAPI.getDetail(id)
			form.setFieldValue('name', res?.name ?? '')
			form.setFieldValue('email', res?.email ?? '')
			form.setFieldValue('gender', res?.gender ?? '')
			form.setFieldValue('note', res?.note ?? '')
		} catch (error: any) {
			AlertError(error.response.data.message)
		}
	}

	const handleEdit = async (values: any) => {
		setIsSubmitted(true)
		// call api
		try {
			await UserAPI.update(id, values)
			AlertSuccess('Updated')
			setIsSubmitted(false)
			router.push(ROUTES.USERS_MANAGEMENT)
		} catch (error: any) {
			setIsSubmitted(false)
			AlertError(error?.response?.data?.message)
		}
	}

	useEffect(() => {
		handleFetchData()
	}, [])

	return (
		<PageContainer title="Edit User Information">
			<Box maw={'80%'} mx="auto">
				{/* Content Form */}
				<form onSubmit={form.onSubmit(handleEdit)}>
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
								<Flex justify="flex-end">
									<Button type="submit" disabled={isSubmitted}>
										Save
									</Button>
								</Flex>
							</Grid.Col>
						</Grid>
					</Stack>
				</form>
			</Box>
		</PageContainer>
	)
}

