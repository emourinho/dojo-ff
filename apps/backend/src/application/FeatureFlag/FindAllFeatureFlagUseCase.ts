import { IFeatureFlagRepository } from '../../repository/interfaces/IFeatureFlagRepository';

export class FindAllFeatureFlagUseCase {
  constructor(private _featureFlagRepository: IFeatureFlagRepository) {}

  execute() {
    return this._featureFlagRepository.readAll();
  }
}
