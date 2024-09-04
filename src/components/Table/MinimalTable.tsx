/* eslint-disable prettier/prettier */
'use client'

import { ActionIcon, Box, Stack } from '@mantine/core'
import { IconEdit, IconEyeCheck, IconTrash } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'
import Link from 'next/link'
import { useEffect } from 'react'

interface TableProps {
	url?: string
	columns?: any
	data?: any
	handleGetData: () => void
	handleDeleteRow?: (row: any) => void
	isReload?: number
	enableRowActions?: boolean
	filters?: any
}

export const MinimalTable = (props: TableProps) => {
	useEffect(() => {
		props.handleGetData()
	}, [props.isReload])

	return (
		<Stack>
			<MantineReactTable
				// default
				columns={props.columns}
				data={props?.data ?? []}
				state={{ isLoading: !props?.data }}
				enableTopToolbar={false}
				enableBottomToolbar={false}
				enablePagination={false}
				// header function
				enableFullScreenToggle={false}
				enableDensityToggle={false}
				enableHiding={false}
				enableFilters={false}
				enableGlobalFilter={false}
				// column function
				enableColumnActions={false}
				enableSorting={false}
				// action
				positionActionsColumn="last"
				enableEditing={props.enableRowActions ? true : false}
				renderRowActions={({ row }: any) => {
					return !props.enableRowActions ? null : (
						<Box
							sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
						>
							<>
								<ActionIcon>
									<Link
										href={`${props.url}/${row?.original?.id}`}
										style={{ color: 'unset' }}
									>
										<IconEdit />
									</Link>
								</ActionIcon>

								<ActionIcon
									onClick={() =>
										props.handleDeleteRow &&
										props.handleDeleteRow(row?.original?.id)
									}
								>
									<IconTrash />
								</ActionIcon>
							</>
						</Box>
					)
				}}
				// UI for Table
				mantineTableHeadCellProps={{
					sx: {
						'& .mantine-TableHeadCell-Content': {
							justifyContent: 'center',
						},
					},
				}}
				mantineTableBodyProps={{
					sx: {
						textAlign: 'center',
					},
				}}
				mantineBottomToolbarProps={{
					sx: {
						'& .mantine-Select-root': {
							display: 'none',
						},
					},
				}}
			/>
		</Stack>
	)
}

