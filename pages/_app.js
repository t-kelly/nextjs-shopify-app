import "@shopify/polaris/dist/styles.css";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import PolarisProvider from '@components/PolarisProvider';
import AuthProvider from '@components/AuthProvider';
import ApolloProvider from '@components/AuthProvider';

function App({ Component, pageProps, host, apiKey}) {
  return (
    <PolarisProvider>
      <AppBridgeProvider config={{ apiKey, host, forceRedirect: true }}>
        <AuthProvider>
          <ApolloProvider>
            <Component {...pageProps} />
          </ApolloProvider>
        </AuthProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

App.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
    apiKey: process.env.API_KEY
  };
};

export default App
