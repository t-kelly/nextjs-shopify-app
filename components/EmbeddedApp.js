import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import PolarisProvider from '@components/PolarisProvider';
import AuthProvider from '@components/AuthProvider';
import ApolloProvider from '@components/AuthProvider';



export default function EmbeddedApp({ host, children}) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <PolarisProvider>
      <AppBridgeProvider config={{ apiKey:API_KEY, host, forceRedirect: true }}>
        <AuthProvider>
          <ApolloProvider>
            {children}
          </ApolloProvider>
        </AuthProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}