import ApolloClient from "apollo-boost";
import { ApolloProvider as Provider } from "react-apollo";
import { fetch } from '@lib/app-bridge';
import { useAppBridge } from "@shopify/app-bridge-react";

export default function ApolloProvider({children}) {
  const app = useAppBridge();
  const client = new ApolloClient({
    fetch: fetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  return <Provider client={client}>{children}</Provider>
}