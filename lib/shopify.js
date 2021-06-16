import Shopify, { ApiVersion } from '@shopify/shopify-api';

const { NEXT_PUBLIC_API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env

Shopify.Context.initialize({
  API_KEY: NEXT_PUBLIC_API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.April21 // all supported versions are available, as well as "unstable" and "unversioned"
});

export default Shopify;
export function ShopifyAuthHandler(req, res) {
  const {shopify} = req.query;

  switch(shopify.join('/')) {
    case 'shopify/login':
      return loginRoute(req,res);
    case 'shopify/callback':
      return callbackRoute(req,res);
  }
}

async function loginRoute(req, res) {
  try {
    const {shop} = req.query;
    const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/api/auth/shopify/callback', true);
    console.log("New OAuth process begining.")
    res.writeHead(302, { 'Location': authRoute });
    res.end();
  }
  catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    }
    else {
      res.end(`Failed to complete OAuth process: ${e.message}`);
    }
  }
  return;
}

async function callbackRoute(req, res) {
  try {
    await Shopify.Auth.validateAuthCallback(req, res, req.query);

    console.log("OAuth process suceeded.")
    res.writeHead(302, { 'Location': `/embedded?host=${req.query.host}` });
    res.end();
  }
  catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    }
    else {
      res.end(`Failed to complete OAuth process: ${e.message}`);
    }
  }
  return;
}