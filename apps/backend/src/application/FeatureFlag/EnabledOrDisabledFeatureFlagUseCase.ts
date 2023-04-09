import { IFeatureFlagRepository } from '../../repository/interfaces/IFeatureFlagRepository';

export class EnabledOrDisabledFeatureFlagUseCase {
  constructor(private _featureFlagRepository: IFeatureFlagRepository) {}

  execute(id: number, enabled: boolean) {
    return this._featureFlagRepository.update(id, { enabled });
  }
}
