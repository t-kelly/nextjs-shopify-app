import Shopify from '@lib/shopify';

export default async function handleWebhooks(req, res) {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
}

// We need to disable the body parser here because `Shopify.Webhooks.Registry.process()`
// expects a raw body which is used for checking the validity (HMAC) of the Webhook
export const config = {
  api: {
    bodyParser: false,
  },
}