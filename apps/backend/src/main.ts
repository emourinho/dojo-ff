import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {
  FindAllFeatureFlagUseCase,
  FindOneFeatureFlagUseCase,
  CreateFeatureFlagUseCase,
} from './application';
import { FeatureFlagInMemoryRepository } from './repository';
import { IFeatureFlag } from '@dojo-ff/domain';
const repo = new FeatureFlagInMemoryRepository();

const typeDefs = `#graphql

scalar Long

  type FeatureFlag {
    id: Long
    name: String
    enabled: Boolean
  }

  type Mutation {
    createFeatureFlag(name: String!, enabled: Boolean!): FeatureFlag
  }


  type Query {
    featureFlags: [FeatureFlag]
    featureFlag (id: Long!): FeatureFlag

  }
`;

const findAllFeatureFlagResolver = async () => {
  const findAllFeatureFlagUseCase = new FindAllFeatureFlagUseCase(repo);
  const resultFindAllFeatureFlag = await findAllFeatureFlagUseCase.execute();
  return resultFindAllFeatureFlag;
};
const findOneFeatureFlagResolver = async (id: number) => {
  const findOneFeatureFlagUseCase = new FindOneFeatureFlagUseCase(repo);
  const resultFindOneFeatureFlagUseCase =
    await findOneFeatureFlagUseCase.execute(id);
  return resultFindOneFeatureFlagUseCase;
};
const createFeatureFlagResolver = async (
  newFeatureFlag: Omit<IFeatureFlag, 'id'>
) => {
  const createFeatureFlagUseCase = new CreateFeatureFlagUseCase(repo);
  const resultCreateFeatureFlagUseCase = await createFeatureFlagUseCase.execute(
    newFeatureFlag
  );
  return resultCreateFeatureFlagUseCase;
};

const resolvers = {
  Query: {
    featureFlags: findAllFeatureFlagResolver,
    featureFlag: async (parent, args) => {
      console.log(parent, args);
      const { id } = args;
      return findOneFeatureFlagResolver(id);
    },
  },
  Mutation: {
    createFeatureFlag: async (parent, args) => {
      console.log(parent, args);
      return createFeatureFlagResolver(args);
    },
  },
};

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
  console.log(`:foguete:  Server ready at: ${url}`);
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
