import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

import {store} from './store';

const URI_SERVER = 'https://bhqmemodatesdback.herokuapp.com'//'http://192.168.1.4:3333'

const httpLink = new HttpLink({uri: `${URI_SERVER}/graphql`});

const authLink = setContext(async(_, {headers}: any) => {
  const {token} = store.getState().auth;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      auth: (_root, variables, { cache, getCacheKey, client}) => {
        console.log(variables)
        //const {access_token, connectedWith} = variables
        //const data = client.readQuery({ query: PROFILE })
        //const data = client.readQuery({ query: OAUTH }, variables)
        //console.log('3', data)
        //cache.wrireData({ data })
        return null
      },
    }
  }
});

export default client