/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Evita chunks quebrados do react-icons no App Router (vendor-chunks/*.js ausente). */
  transpilePackages: ["react-icons"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
