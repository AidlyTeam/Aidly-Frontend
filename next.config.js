/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // Add fallbacks for crypto
        if (!config.resolve) {
            config.resolve = {};
        }
        if (!config.resolve.fallback) {
            config.resolve.fallback = {};
        }

        Object.assign(config.resolve.fallback, {
            crypto: false,
        });

        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig