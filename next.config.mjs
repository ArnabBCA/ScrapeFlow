/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    if (!config.externals) {
      config.externals = [];
    }

    config.externals = [
      function (context, request, callback) {
        if (/^@sparticuz\/chromium-min/.test(request)) {
          return callback(null, "@sparticuz/chromium-min");
        }
        callback();
      },
      ...config.externals,
    ];

    return config;
  },
};

export default nextConfig;
