This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. `git clone https://github.com/t-kelly/nextjs-shopify-app.git`
2. [Expose your dev environment](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#expose-your-dev-environment)
3. [Get a Shopify API Key and API secret key](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key)
  1. Instead of using `https://yourNgrokTunnel.ngrok.io/` for the App URL, use `https://yourNgrokTunnel.ngrok.io/embedded`
  2. Instead of using `https://yourNgrokTunnel.ngrok.io/auth/callback` for the Redirection URLs, use `https://yourNgrokTunnel.ngrok.io/auth/shopify/callback`
4. Rename `.env.example` to `.env.local` and fill in values
5. Run `npm install` and then `npm run dev`
5. [Install and test your app](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#authenticate-and-test)
         

You can start editing the page by modifying `pages/embedded/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
