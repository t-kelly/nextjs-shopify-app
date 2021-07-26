import Shopify, { ApiVersion } from '@shopify/shopify-api';
import RedisStore from '@lib/redis';

const sessionStorage = new RedisStore(process.env.REDIS_URL);
const context = {
  API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.April21, // all supported versions are available, as well as "unstable" and "unversioned"
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback,
  ),
}

Shopify.Context.initialize(context);

Shopify.Context.update = function(overrides) {
  Shopify.Context.initialize({...context, ...overrides});
}

export default Shopify;

export function ShopifyAuth(config = {}) {

  return (req, res) => {
    const { shopifyAuthEndpoint } = req.query;
    const endpointPath = shopifyAuthEndpoint?.join("/") || "/";

    // Provide HOST_NAME here just in case it was not provided by env variable
    // This might occur during the first deploy to Vercel when you don't yet know 
    // what domain your app is being hosted on
    Shopify.Context.update({HOST_NAME: req.headers.host});

    switch (endpointPath) {
      case "/":
        return loginRoute(req, res);
      case "callback":
        return callbackRoute(req, res, config.afterAuth);
    }
  }
}

async function loginRoute(req, res) {
  try {
    const {shop} = req.query;
    const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/auth/callback', true);
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