const apiUrl = new URL(
  (process.env.NEXT_PUBLIC_API_URL || "https://api.websnomadas.com").trim(),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [50, 60, 70, 75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/**",
      },
    ],
    // Next bloquea IPs privadas/localhost en el optimizador salvo en desarrollo
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
