import Shopify from '@lib/shopify'

export default async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res);
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
  const products = await client.get({
    path: 'products',
  });

  res.status(200).json(products)
}

export const config = {
  api: {
    bodyParser: false,
  },
}