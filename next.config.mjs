/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
            source: '/:path*',
            destination: '/:path*',
            has: [
                {
                type: 'query',
                key: '_rsc',
                },
            ],
            permanent: true, // Or false if it's a temporary redirect
            },
        ];
    },
};


export default nextConfig;
