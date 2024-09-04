const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

module.exports = async (_phase) => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		reactStrictMode: false,
		swcMinify: true,
		async redirects() {
			return [
				{
					source: '/',
					destination: '/auth/login',
					permanent: true,
				},
			]
		},
	}

	return withPlugins(
		[
			[
				withImages({
					webpack(config) {
						config.module.rules.push({
							test: /\.svg$/,
							use: ['@svgr/webpack'],
						})
						return config
					},
				}),
			],
		],
		nextConfig,
	)(_phase, { defaultConfig: {} })
}
