import { ApolloClient, InMemoryCache } from "@apollo/client";

export const clientMumbai = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/46910/cryptomark3t/v0.0.1',
    cache: new InMemoryCache(),
});