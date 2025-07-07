/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  },
  webpack(config) {
    config.externalsPresets = { node: true };
    config.externals = {
      ...config.externals,
      "@sparticuz/chromium": "commonjs2 @sparticuz/chromium",
    };
    return config;
  },
};

export default nextConfig;
