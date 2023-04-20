import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { FindAllFeatureFlagUseCase } from './application';
import { FeatureFlagInMemoryRepository } from './repository';

const repo = new FeatureFlagInMemoryRepository();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type FeatureFlag {
    id: Int
    name: String
    enabled: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "featureFlags" query returns an array of zero or more Books (defined above).
  type Query {
    featureFlags: [FeatureFlag]
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const FindAllFeatureFlagResolver = async () => {
  const findAllFeatureFlagUseCase = new FindAllFeatureFlagUseCase(repo);
  const resultFindAllFeatureFlag = await findAllFeatureFlagUseCase.execute();
  return resultFindAllFeatureFlag;
};

const resolvers = {
  Query: {
    featureFlags: FindAllFeatureFlagResolver,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();

// CODIGO ANTIGO

// import {
//   CreateFeatureFlagUseCase,
//   DeleteFeatureFlagUseCase,
//   EnabledOrDisabledFeatureFlagUseCase,
//   FindAllFeatureFlagUseCase,
// } from './application';
// import { FeatureFlagInMemoryRepository } from './repository';

// const repo = new FeatureFlagInMemoryRepository();

// const main = async () => {
//   // const createUseCase = new CreateFeatureFlagUseCase(repo);
//   // const resultCreate = await createUseCase.execute({
//   //   enabled: true,
//   //   name: 'mkwhatsone',
//   // });
//   // console.log('resultCreate', resultCreate);
//   // CREATE
//   // ENABLE OR DISABLED
//   // const EnabledUseCase = new EnabledOrDisabledFeatureFlagUseCase(repo);
//   // const resultEnabled = await EnabledUseCase.execute(123, true);
//   // console.log('resultEnabled', resultEnabled);
//   // ENABLE OR DISABLED
//   // DELETE
//   // const deleteUseCase = new DeleteFeatureFlagUseCase(repo);
//   // const resultDelete = await deleteUseCase.execute(123);
//   // console.log('resultDelete', resultDelete);
//   // DELETE
//   // LIST
//   const listUseCase = new FindAllFeatureFlagUseCase(repo);
//   const resultList = await listUseCase.execute();
//   console.log('resultList', resultList);
//   // LIST
// };

// main();
