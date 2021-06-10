import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { fetch } from '@lib/app-bridge';

export default function ApolloProvider({children}) {
  const client = new ApolloClient({
    fetch: fetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}