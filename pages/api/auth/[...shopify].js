import Shopify, {ShopifyAuth} from '@lib/shopify';

export default ShopifyAuth({
  afterAuth: async (req, res, {accessToken, shop}) => {
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