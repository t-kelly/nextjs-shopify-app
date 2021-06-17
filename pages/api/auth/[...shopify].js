import Shopify, {ShopifyAuth} from '@lib/shopify';

export default ShopifyAuth({
  afterAuth: async (req, res, {accessToken, shop}) => {
    // Provide HOST_NAME here just in case it was not provided by env variable
    // This might occur during the first deploy to Vercel when you don't yet know 
    // what domain your app is being hosted on
    Shopify.Context.update({ HOST_NAME: req.headers.host});
    
    const response = await Shopify.Webhooks.Registry.register({
      shop,
      accessToken,
      path: "/api/webhooks/shopify",
      topic: "APP_UNINSTALLED",
      webhookHandler: (topic, shop, body) => {
        console.log('APP_UNINSTALLED handler was executed')
      },
    });

    if (!response.success) {
      console.log(
        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
      );
    } else {
      console.log('APP_UNINSTALLED Webhook was successfully registered')
    }
  }
});