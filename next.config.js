const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  future: { webpack5: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|otf|png)$/,
      type: 'asset/inline',
    });
    return config;
  },
});
