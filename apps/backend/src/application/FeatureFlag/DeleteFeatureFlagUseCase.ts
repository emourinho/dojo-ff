import { IFeatureFlagRepository } from '../../repository/interfaces/IFeatureFlagRepository';

export class DeleteFeatureFlagUseCase {
  constructor(private _featureFlagRepository: IFeatureFlagRepository) {}

  execute(id: number) {
    return this._featureFlagRepository.deleteOne(id);
  }
}
