/* eslint-disable no-mixed-operators */
'use client'

import * as AuthAPI from '@/api/AuthAPI'
import { AlertError, AlertSuccess } from '@/components/Alert/Alert'
import { userStore } from '@/stores/userStore'
import mockupData from '@/utils/mockupData.json'
import { ROUTES } from '@/utils/routers'
import {
	Box,
	Button,
	PasswordInput,
	Popover,
	Progress,
	Space,
	Text,
	TextInput,
} from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import classes from './style.module.scss'

function PasswordRequirement({
	meets,
	label,
}: {
	meets: boolean
	label: string
}) {
	return (
		<Text
			color={meets ? 'teal' : 'red'}
			sx={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size="sm"
		>
			{meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{' '}
			<Box ml={10}>{label}</Box>
		</Text>
	)
}

export default function Login() {
	const router = useRouter()
	const setUserState = useSetRecoilState(userStore)
	const [popoverOpened, setPopoverOpened] = useState(false)
	const [valuePass, setValuePass] = useState('')

	const requirements = [
		{ re: /[0-9]/, label: 'Includes number' },
		{
			re: /[$&+,:;=?@#|'<>.^*()%!-]/,
			label: 'Includes special symbol',
		},
	]

	const getStrength = (password: string) => {
		let multiplier = password.length > 5 ? 0 : 1

		requirements.forEach((requirement) => {
			if (!requirement.re.test(password)) {
				multiplier += 1
			}
		})

		return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
	}

	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(valuePass)}
		/>
	))

	const strength = getStrength(valuePass)
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

	const form = useForm({
		initialValues: {
			email: '',
			password: valuePass,
		},

		validate: {
			email: isEmail('Invalid Email'),
			password: (value) => (strength === 100 ? null : 'Invalid Password'),
		},
		validateInputOnBlur: true,
	})

	const handleLogin = async (values) => {
		try {
			const res = await AuthAPI.login({
				username: values.email,
				password: valuePass,
			})

			if (res) {
				setUserState({
					is_login: true,
				})
				localStorage.setItem('userManagementStore', JSON.stringify(mockupData))
				router.push(ROUTES.DASHBOARD)
				AlertSuccess('Login Successful')
			} else {
				AlertError('Please check your account and password')
			}
		} catch (error: any) {
			AlertError('Please check your account and password')
		}
	}

	return (
		<div className={classes.loginPage}>
			<form onSubmit={form.onSubmit((values) => handleLogin(values))}>
				<TextInput
					label="Email"
					placeholder="Enter your email"
					{...form.getInputProps('email')}
				/>
				<Space h="lg" />
				<Popover
					opened={popoverOpened}
					position="bottom"
					width="target"
					transitionProps={{ transition: 'pop' }}
				>
					<Popover.Target>
						<div
							onFocusCapture={() => setPopoverOpened(true)}
							onBlurCapture={() => setPopoverOpened(false)}
						>
							<PasswordInput
								label="Password"
								placeholder="Enter Password"
								{...form.getInputProps('password')}
								value={valuePass}
								onChange={(event) => setValuePass(event.currentTarget.value)}
							/>
						</div>
					</Popover.Target>
					<Popover.Dropdown>
						<Progress color={color} value={strength} size={5} mb="xs" />
						<PasswordRequirement
							label="Password must be 8-20 characters long"
							meets={valuePass.length > 5 && valuePass.length < 21}
						/>
						{checks}
					</Popover.Dropdown>
				</Popover>
				<Button
					className={classes.loginWithEmail}
					mt="xl"
					fullWidth
					type="submit"
				>
					Log In
				</Button>
			</form>
		</div>
	)
}

