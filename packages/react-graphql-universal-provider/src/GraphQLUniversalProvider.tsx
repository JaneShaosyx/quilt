import React from 'react';

import {useSerialized} from '@shopify/react-html';
import {ApolloProvider, createSsrExtractableLink} from '@shopify/react-graphql';
import {useLazyRef} from '@shopify/react-hooks';

interface Props {
  children?: React.ReactNode;
  createClient(): import('apollo-client').ApolloClient<any>;
}

export function GraphQLUniversalProvider({children, createClient}: Props) {
  const [initialData, Serialize] = useSerialized<object | undefined>('apollo');

  // Pair on
  const setServerState = useServerState();

  const [client, link] = useLazyRef<
    [
      import('apollo-client').ApolloClient<any>,
      ReturnType<typeof createSsrExtractableLink>
    ]
  >(() => {
    const link = createSsrExtractableLink();
    const client = createClient();
    client.link = link.concat(
      client.link,
      createOperationsDetailLink({
        onOperation() {
          setServerState('florp', bar);
        },
      }),
    );

    if (initialData) {
      client.cache = client.cache.restore(initialData);
    }

    return [client, link];
  }).current;

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
      <Serialize data={() => link.resolveAll(() => client.extract())} />
    </>
  );
}

// react-network/manager.ts

// add a useState hook and a state object to the manager

// react-network/server.ts

//
