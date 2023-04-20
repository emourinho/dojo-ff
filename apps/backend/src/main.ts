import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {
  FindAllFeatureFlagUseCase,
  FindOneFeatureFlagUseCase,
} from './application';
import { FeatureFlagInMemoryRepository } from './repository';
const repo = new FeatureFlagInMemoryRepository();

const typeDefs = `#graphql

  type FeatureFlag {
    id: Int
    name: String
    enabled: Boolean
  }

  type Query {
    featureFlags: [FeatureFlag]
    featureFlag (id: Int!): FeatureFlag
  }
`;

const FindAllFeatureFlagResolver = async () => {
  const findAllFeatureFlagUseCase = new FindAllFeatureFlagUseCase(repo);
  const resultFindAllFeatureFlag = await findAllFeatureFlagUseCase.execute();
  return resultFindAllFeatureFlag;
};
const findOneFeatureFlagUseCaseResolver = async (id: number) => {
  const findOneFeatureFlagUseCase = new FindOneFeatureFlagUseCase(repo);
  const resultFindOneFeatureFlagUseCase =
    await findOneFeatureFlagUseCase.execute(id);
  return resultFindOneFeatureFlagUseCase;
};

const resolvers = {
  Query: {
    featureFlags: FindAllFeatureFlagResolver,
    featureFlag: async (parent, args) => {
      console.log(parent, args)
      const { id } = args
      return findOneFeatureFlagUseCaseResolver(id)
    }
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
