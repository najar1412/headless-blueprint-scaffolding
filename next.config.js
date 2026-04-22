const { withFaust, getWpHostname } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bpheadlessb541.wpenginepowered.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/asembia',
        destination: 'mailto:caitlin@nexushealthgrp.com',
        permanent: true,
      },
    ];
  },
});
