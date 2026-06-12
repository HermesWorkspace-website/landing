/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload' 

const nextConfig = {
    allowedDevOrigins: ["pointing-factor-monorail.ngrok-free.dev"],
    images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [75, 92],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                pathname: "/**",
            },
        ],
    }
};

export default withPayload(nextConfig)