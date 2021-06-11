import Shopify from '@lib/shopify';

export default async function handleWebhooks(req, res) {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
}