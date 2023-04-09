import { FeatureFlag, IFeatureFlag } from '@dojo-ff/domain';

export interface IFeatureFlagRepository {
  create(featureFlag: Omit<IFeatureFlag, 'id'>): Promise<FeatureFlag>;
  readOne(id: number): Promise<FeatureFlag>;
  readAll(): Promise<FeatureFlag[]>;
  update(id: number, featureFlag: Partial<IFeatureFlag>): Promise<FeatureFlag>;
  deleteOne(id: number): Promise<boolean>;
}
