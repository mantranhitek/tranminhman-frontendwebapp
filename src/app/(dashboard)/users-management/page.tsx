/* eslint-disable prettier/prettier */
'use client'
import * as UserAPI from '@/api/UserAPI'
import { AlertError, AlertSuccess } from '@/components/Alert/Alert'
import { PageContainer } from '@/components/PageContainer'
import { MinimalTable } from '@/components/Table/MinimalTable'
import { IUser } from '@/types/models/User'
import { ROUTES } from '@/utils/routers'
import { Button, Flex, Grid, Stack, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import dayjs from 'dayjs'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

export default function MakerPage() {
	const router = useRouter()
	const [data, setData] = useState<IUser[]>()

	const columns = useMemo<MRT_ColumnDef[]>(
		() => [
			{
				accessorKey: 'stt',
				header: '#',
				size: 50,
			},
			{
				accessorKey: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'gender',
				header: 'Gender',
			},
			{
				accessorKey: 'note',
				header: 'Note',
				Cell: ({ cell }) => (
					<Tooltip label={cell.getValue<string>()}>
						<Text lineClamp={3}>{cell.getValue<string>()}</Text>
					</Tooltip>
				),
			},
			{
				accessorKey: 'created_at',
				header: 'Joined',
				Cell: ({ cell }) => (
					<p>{dayjs(cell.getValue<string>()).format('YYYY-MM-DD HH:mm:ss')}</p>
				),
			},
		],
		[],
	)

	// handleDelete
	const [isReload, setIsReload] = useState<number>(0)

	const handleDelete = async (id: string) => {
		try {
			await UserAPI.remove(id)
			setIsReload(isReload + 1)
			AlertSuccess()
		} catch (error: any) {
			AlertError(error?.response?.data?.message)
		}
	}

	const handleDeleteRow = useCallback(
		(row: string) => {
			modals.openConfirmModal({
				title: 'Are you sure you want to delete?',
				centered: true,
				labels: { confirm: 'Confirm', cancel: 'CRUD.Cancel' },
				confirmProps: { color: 'red' },
				onConfirm: async () => await handleDelete(row),
			})
		},
		[data],
	)

	// handleFetch
	const handleGetData = async () => {
		try {
			// call api
			let res: IUser[] = await UserAPI.getList()
			const newRes: IUser[] = res.map((item: any, index: number) => {
				return {
					...item,
					stt: index + 1,
				}
			})
			setData(newRes)
		} catch (error: any) {
			AlertError(error?.response?.data?.message)
		}
	}

	return (
		<PageContainer title="Users Management">
			<Stack>
				<Grid>
					<Grid.Col
						span={12}
						style={{ display: 'flex', justifyContent: 'end' }}
					>
						<Flex align="flex-end" direction="column">
							<Button
								onClick={() => {
									router.push(ROUTES.USERS_MANAGEMENT_CREATE)
								}}
							>
								Create
							</Button>
						</Flex>
					</Grid.Col>
				</Grid>

				<MinimalTable
					url={ROUTES.USERS_MANAGEMENT}
					data={data}
					columns={columns}
					handleGetData={handleGetData}
					handleDeleteRow={handleDeleteRow}
					isReload={isReload}
					enableRowActions={true}
				/>
			</Stack>
		</PageContainer>
	)
}

