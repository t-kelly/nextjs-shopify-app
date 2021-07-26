# Shopify NextJS App Example

An example app built with NextJS that can be setup and deployed to production in seconds on Vercel. 

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ft-kelly%2Fnextjs-shopify-app&env=SHOPIFY_API_KEY,SHOPIFY_API_SECRET&project-name=shopify-nextjs-app&repository-name=shopify-nextjs-app&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17)

This examples uses [Upstash](https://upstash.com/) (Serverless Redis Database) as its data storage. During deployment, you will be asked to connect with Upstash. The integration will help you create a free Redis database and link it to your Vercel project automatically.

You'll need to [get a Shopify App API Key and API secret key](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key) inside the Partner Dashboard to complete the deploy. After deployed, select **App Setup** on your app's summary page in Partner Dashboard, and update the following values:

- App URL: `https://[your-vercel-deploy-url].vercel.app/embedded`
- Allowed redirection URL(s): `https://[your-vercel-deploy-url].vercel.app/auth/callback`

Finally, install your app on a development store by selecting **Test on development store** on your app's summary page in Partner Dashboard

## Setup Local Development

The fastest way to develop locally and keeping your variables and app URL's updated is with the [Shopify CLI](https://shopify.dev/apps/tools/cli). 

The Shopify CLI will automatically;
- Generate the `.env` file with auto-populated values
- Start your local server
- Expose your local server with ngrok
- Update your App URLs in your Shopify development store
- Give you a link to easily install your app on your development store

If you don't have it, [install the Shopify CLI](https://shopify.dev/apps/tools/cli/installation). You can however do the [local setup manually](#manual-setup) without the CLI if you want.

### Setup with the Shopify CLI

1. Clone your app's repo `git clone https://github.com/[your-user-name]/nextjs-shopify-app.git`

2. Install the dependencies with `npm install`

3. Serve the project with `shopify node serve`. The first time, the CLI will ask you which development store would you like to use. Select it then press enter to confirm. The CLI will then automatically generate the `.env` file with auto-populated values for those variables: `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOP`, `SCOPES`, `HOST`. The CLI will always put those variables at the top of your `.env` file.

4. Stop serving the project, copy the `REDIS_URL` variable from the `.env.example` into `.env` and fill it.

5. You can now serve the project with `shopify node serve` and click on the link provided in your console to install your local app on your development store.

You can start editing the page by modifying `pages/embedded/index.js`. The page auto-updates as you edit the file. The next time you'll serve your project, the Shopify CLI will keep your variables and app URL's updated.

### Manual setup

1. Clone your app's repo `git clone https://github.com/[your-user-name]/nextjs-shopify-app.git`

2. Install the dependencies with `npm install`

3. [Expose your dev environment](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#expose-your-dev-environment) with ngrok

4. [Get another Shopify API Key and API secret key for local development](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key) inside the Partner Dashboard, and update the following values:

   - App URL: `https://[your-ngrok-tunnel-url].ngrok.io/embedded`
   - Allowed redirection URL(s): `https://[your-ngrok-tunnel-url].ngrok.io/auth/callback`

5. Rename `.env.example` to `.env` and fill in values.

6. Run `npm run dev`

7. [Install your app on a development store and start developing!](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#authenticate-and-test)

You can start editing the page by modifying `pages/embedded/index.js`. The page auto-updates as you edit the file.

## Environment variables

| Variable | Generated by the CLI | Description |
| --- | --- | --- |
| `SHOPIFY_API_KEY` | ✅ | Shopify App API key. |
| `SHOPIFY_API_SECRET` | ✅ | Shopify App API secret. |
| `SHOP` | ✅ | The URL of the development store (eg: `my-shop-name.myshopify.com`) |
| `SCOPES` | ✅ | [The admin API access scopes](https://shopify.dev/api/admin/access-scopes) separated by comma (eg: `write_products,write_customers,write_draft_orders`) |
| `HOST` | ✅ | The URL of your app (eg: `https://my-shopify-app.com`) |
| `REDIS_URL` | | The URL of your Redis database in the [format accepted by ioredis](https://github.com/luin/ioredis#connect-to-redis) |
| `NEXT_PUBLIC_SHOPIFY_API_KEY` | | Variable bridge to expose the `SHOPIFY_API_KEY` to the client. |

### `SHOPIFY_API_KEY` and `NEXT_PUBLIC_SHOPIFY_API_KEY` variables

> To well understand this part, is good to have a good understanding of how NextJS deal with environment variables. Check the [NextJS Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables) if it's something new for you.

The Shopify API Key is a public key that must be used on server and client sides. On NextJS, in order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`.

However, when the CLI generate the environment variables, we cannot choose the names of the variables nor the name of the dotenv file since they are hardcoded in the CLI ([source](https://github.com/Shopify/shopify-cli/blob/7e8a8b9865c89c70ec5bc55900d2ca6e74737a63/lib/shopify-cli/resources/env_file.rb#L9)).

Because of that limitation, `SHOPIFY_API_KEY` must be the variable that hold the Shopify API key value since it's the one generated by the CLI. But to expose that value to the client, we need to expose it into a variable starting with `NEXT_PUBLIC_`. 

This is what we do in the `.env.development` and `.env.production` files with a bridge;

```
NEXT_PUBLIC_SHOPIFY_API_KEY=$SHOPIFY_API_KEY
```

Now, why do we have a `.env.development` and a `.env.production` file? 

The NextJS dotenv naming convention specify that;

- `.env` should be used to set the defaults for all environments
- `.env.development` should be used to set the defaults for development environment
- `.env.production` should be used to set the defaults for production environment

Since the Shopify CLI generate the environment variables (and secrets) only into the `.env` file, we cannot use the `.env` file to store the defaults for all environments and should consider this file as the `.env.local`.

Due to this limitation of the Shopify CLI, the defaults for all environments must be put into `.env.development` and `.env.production` dotenv files.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
