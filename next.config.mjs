/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["pointing-factor-monorail.ngrok-free.dev"],
    images: {
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

export default nextConfig;