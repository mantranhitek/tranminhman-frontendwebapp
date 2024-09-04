/* eslint-disable prettier/prettier */
import { Sidebar } from '@/components/Sidebar'
import {
	Group,
	Navbar,
	ScrollArea,
	createStyles,
	getStylesRef,
	rem,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { Logo } from '../../Logo'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userStore } from '@/stores/userStore'
import { ROUTES } from '@/utils/routers'
import { INavItem } from '@/types/models/NavItem'

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
	},

	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	links: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,

		'.mantine-ScrollArea-scrollbar': {
			display: 'none',
		},
	},

	linksInner: {
		padding: theme.spacing.xl,
	},

	link: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		paddingBottom: 0,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,

			[`& .${getStylesRef('icon')}`]: {
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			},
		},
	},

	linkIcon: {
		ref: getStylesRef('icon'),
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[2]
				: theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
			[`& .${getStylesRef('icon')}`]: {
				color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
					.color,
			},
		},
	},

	footer: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}))

interface Props {
	data: INavItem[]
	hidden?: boolean
}

export function AdminNavbar({ data, hidden }: Props) {
	const { classes } = useStyles()
	const router = useRouter()

	const handleLogout = async () => {
		openModal()
	}
	const setUserState = useSetRecoilState(userStore)

	const openModal = () =>
		modals.openConfirmModal({
			title: 'Are you sure you want to log out?',
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => {
				setUserState(null)
				router.push(ROUTES.LOGIN)
			},
		})

	return (
		<Navbar
			hidden={hidden}
			hiddenBreakpoint="sm"
			height="100vh"
			width={{ sm: 300 }}
			p="md"
			className={classes.navbar}
		>
			<Navbar.Section className={classes.header}>
				<Group position="apart" h={rem(40)}>
					<Logo width={rem(30)} />
				</Group>
			</Navbar.Section>

			<Navbar.Section grow className={classes.links} component={ScrollArea}>
				<div className={classes.linksInner}>
					<Sidebar links={data} />
				</div>
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => handleLogout()}
				>
					<IconLogout className={classes.linkIcon} />
					<span>Log Out</span>
				</a>
			</Navbar.Section>
		</Navbar>
	)
}
