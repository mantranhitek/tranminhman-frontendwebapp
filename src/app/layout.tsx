import RootStyleRegistry from './emotion'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en-US">
			<head>
				<title>MoovTek Test</title>
				<link rel="icon" href="/logo2.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@300;500;700;900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<RootStyleRegistry>{children}</RootStyleRegistry>
			</body>
		</html>
	)
}
