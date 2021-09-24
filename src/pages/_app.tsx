import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { createClient, Provider, dedupExchange, fetchExchange, gql } from 'urql';
import { cacheExchange, query } from '@urql/exchange-graphcache';
import { useMeQuery, MeDocument, MeQuery, LoginMutation, RegisterMutation, LogoutMutation } from '../generated/graphql';


const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result: LoginMutation, _args, cache, _info) => {
          cache.updateQuery({ query: MeDocument }, () => {
            if (result.login.errors) {
              return null
            } else {
              return {
                me: result.login.user
              }
            }
          })
        },
        register: (result: RegisterMutation, _args, cache, _info) => {
          cache.updateQuery({ query: MeDocument }, () => {
            if (result.register.errors) {
              return null
            } else {
              return {
                me: result.register.user
              }
            }
          })
        },
        logout: (result, _args, cache, _info) => {
          cache.updateQuery({ query: MeDocument }, () => (
            { me: null }
          ))
        }
      }
    }
  }), fetchExchange],

});


function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>

    </Provider>

  )
}

export default MyApp
