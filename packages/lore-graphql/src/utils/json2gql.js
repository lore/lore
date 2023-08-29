import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export default function json2gql(query) {
  return jsonToGraphQLQuery(query, {
    pretty: true
  });
}
