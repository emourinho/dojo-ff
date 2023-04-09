import { IFeatureFlag } from '@dojo-ff/domain';
import { IFeatureFlagRepository } from '../../repository/interfaces/IFeatureFlagRepository';

export class CreateFeatureFlagUseCase {
  constructor(private _featureFlagRepository: IFeatureFlagRepository) {}

  execute(featureFlag: Omit<IFeatureFlag, 'id'>) {
    return this._featureFlagRepository.create(featureFlag);
  }
}
