module.exports = {
  // Rewrite the Shopify auth routes to be at /auth an not /api/auth
  // See: https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/auth/:shopifyAuthEndpoint*",
          destination: "/api/auth/:shopifyAuthEndpoint*",
        },
      ],
    };
  },
};
