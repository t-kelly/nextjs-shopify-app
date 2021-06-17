import Shopify from '@lib/shopify';

export default async function handleWebhooks(req, res) {
  // Provide HOST_NAME here just in case it was not provided by env variable
  // This might occur during the first deploy to Vercel when you don't yet know 
  // what domain your app is being hosted on
  Shopify.Context.update({HOST_NAME: req.headers.host});

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