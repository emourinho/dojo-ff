import {
  CreateFeatureFlagUseCase,
  DeleteFeatureFlagUseCase,
  EnabledOrDisabledFeatureFlagUseCase,
  FindAllFeatureFlagUseCase,
} from './application';
import { FeatureFlagInMemoryRepository } from './repository';

const repo = new FeatureFlagInMemoryRepository();

const main = async () => {
  // CREATE
  // const createUseCase = new CreateFeatureFlagUseCase(repo);
  // const resultCreate = await createUseCase.execute({
  //   enabled: true,
  //   name: 'mkwhatsone',
  // });
  // console.log('resultCreate', resultCreate);
  // CREATE
  // ENABLE OR DISABLED
  // const EnabledUseCase = new EnabledOrDisabledFeatureFlagUseCase(repo);
  // const resultEnabled = await EnabledUseCase.execute(123, true);
  // console.log('resultEnabled', resultEnabled);
  // ENABLE OR DISABLED
  // DELETE
  // const deleteUseCase = new DeleteFeatureFlagUseCase(repo);
  // const resultDelete = await deleteUseCase.execute(123);
  // console.log('resultDelete', resultDelete);
  // DELETE
  // LIST
  const listUseCase = new FindAllFeatureFlagUseCase(repo);
  const resultList = await listUseCase.execute();
  console.log('resultList', resultList);
  // LIST
};

main();
