import { IFeatureFlagRepository } from '../../repository/interfaces/IFeatureFlagRepository';

export class FindOneFeatureFlagUseCase {
  constructor(private _featureFlagRepository: IFeatureFlagRepository) {}

  execute(id: number) {
    return this._featureFlagRepository.readOne(id);
  }
}
