# Shopify NextJS App Example

An example app built with NextJS that can be setup and deployed to production in seconds on Vercel. 

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ft-kelly%2Fnextjs-shopify-app&env=NEXT_PUBLIC_SHOPIFY_APP_API_KEY,SHOPIFY_APP_API_SECRET_KEY&project-name=shopify-nextjs-app&repo-name=shopify-nextjs-app&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17)

This examples uses [Upstash](https://upstash.com/) (Serverless Redis Database) as its data storage. During deployment, you will be asked to connect with Upstash. The integration will help you create a free Redis database and link it to your Vercel project automatically.

You'll need to [get a Shopify App API Key and API secret key](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key) inside the Partner Dashboard to complete the deploy. After deployed, select **App Setup** on your app's summary page in Partner Dashboard, and update the following values:
1. App Url: `https://[your-vercel-deploy-url].vercel.app/embedded`
2. Redirection URLs: `https://[your-vercel-deploy-url].vercel.app/api/auth/shopify/callback`

Finally, install your app on a development store by selecting **Test on development store** on your app's summary page in Partner Dashboard

## Setup Local Development

1. Clone your app's repo `git clone https://github.com/[your-user-name]/nextjs-shopify-app.git`
2. Create another Shopify App for Development inside the [Partner Dashboard](https://partners.shopify.com/current/stores?shpxid=a1fb8161-E1A9-475F-5DF6-E0BCC9D15DFF) and use the Shopify API Key and API secret key for local development.
4. Rename `.env.example` to `.env.local` and fill in values
5. Run `npm install` and then `npm run dev`
6. [Expose your dev environment](https://ngrok.com/docs#getting-started-expose) with ngrok (nextjs runs on port 3000 by default)
7. Update your Dev Apps settings in the Partner Dashboard with the following URLs:
   - Instead of using `https://yourNgrokTunnel.ngrok.io/` for the App URL, use `https://yourNgrokTunnel.ngrok.io/embedded`
   - Instead of using `https://yourNgrokTunnel.ngrok.io/auth/callback` for the Redirection URLs, use `https://yourNgrokTunnel.ngrok.io/api/auth/shopify/callback`
8. [Install your app on a development store and start developing!](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#authenticate-and-test) 

You can start editing the page by modifying `pages/embedded/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
