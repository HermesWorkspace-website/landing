/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["pointing-factor-monorail.ngrok-free.dev"],
    images: {
        qualities: [75, 92]
    }
};

export default nextConfig;