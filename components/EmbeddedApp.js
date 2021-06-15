import { useRouter } from 'next/router'
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import PolarisProvider from '@components/PolarisProvider';
import SessionProvider from '@components/SessionProvider';
import ApolloProvider from '@components/SessionProvider';
import RoutePropagator from '@components/RoutePropagator';

export default function EmbeddedApp({children}) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const {query} = useRouter();

  return (
    <PolarisProvider>
      <AppBridgeProvider config={{ apiKey:API_KEY, host: query.host, forceRedirect: true }}>
        <SessionProvider>
          <RoutePropagator/>
          <ApolloProvider>
            {children}
          </ApolloProvider>
        </SessionProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}