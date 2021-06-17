import Shopify, { ApiVersion } from '@shopify/shopify-api';
import RedisStore from '@lib/redis';

const { 
  NEXT_PUBLIC_API_KEY, 
  API_SECRET_KEY, 
  SCOPES, 
  HOST,
  REDIS_URL 
} = process.env
const sessionStorage = new RedisStore(REDIS_URL);

Shopify.Context.initialize({
  API_KEY: NEXT_PUBLIC_API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.April21, // all supported versions are available, as well as "unstable" and "unversioned"
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback,
  ),
});

export default Shopify;
export function ShopifyAuth(config = {}) {

  return (req, res) => {
    const {shopify} = req.query;

    switch(shopify.join('/')) {
      case 'shopify/login':
        return loginRoute(req,res);
      case 'shopify/callback':
        return callbackRoute(req,res,config.afterAuth);
    }
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

async function callbackRoute(req, res, afterAuth) {
  let redirectUrl = `/embedded?host=${req.query.host}`;

  try {
    await Shopify.Auth.validateAuthCallback(req, res, req.query);
    const currentSession = await Shopify.Utils.loadCurrentSession(req, res);

    if (typeof afterAuth === 'function') {
      redirectUrl = await afterAuth(req, res, currentSession) || redirectUrl;
    }

    res.writeHead(302, { 'Location': redirectUrl });
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