import React from 'react';
import PropTypes from 'prop-types';
import MutationsContext from '../contexts/MutationsContext';
import QueriesContext from '../contexts/QueriesContext';
import { ApolloProvider } from 'react-apollo-hooks';

GraphQLProvider.propTypes = {
  client: PropTypes.object.isRequired,
  queries: PropTypes.object.isRequired,
  mutations: PropTypes.object.isRequired,
  context: PropTypes.object,
  children: PropTypes.any
};

export function GraphQLProvider(props) {
  const {
    client,
    queries,
    mutations,
    children,
    // context
  } = props;

  return (
    <QueriesContext.Provider value={queries}>
      <MutationsContext.Provider value={mutations}>
        <ApolloProvider client={client}>
          {React.cloneElement(children)}
        </ApolloProvider>
      </MutationsContext.Provider>
    </QueriesContext.Provider>
  );
}

export default GraphQLProvider;
