/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    if (!config.externals) config.externals = [];
    if (Array.isArray(config.externals)) {
      config.externals.push({
        "@sparticuz/chromium": "commonjs @sparticuz/chromium",
      });
    }
    return config;
  },
};

export default nextConfig;
