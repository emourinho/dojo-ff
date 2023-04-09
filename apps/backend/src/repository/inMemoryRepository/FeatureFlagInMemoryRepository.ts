import { IFeatureFlag, FeatureFlag } from '@dojo-ff/domain';
import { IFeatureFlagRepository } from './../interfaces/IFeatureFlagRepository';

const featureFlagsInMemory: FeatureFlag[] = [
  {
    id: 123,
    name: 'Whatsapp cross',
    enabled: true,
  },
];

export class FeatureFlagInMemoryRepository implements IFeatureFlagRepository {
  async create(featureFlag: IFeatureFlag): Promise<FeatureFlag> {
    featureFlag.id = new Date().getTime();
    featureFlagsInMemory.push(featureFlag);
    return featureFlag;
  }

  async readOne(id: number): Promise<FeatureFlag> {
    return featureFlagsInMemory.find((ff) => ff.id == id);
  }

  async readAll(): Promise<FeatureFlag[]> {
    return featureFlagsInMemory;
  }

  async update(
    id: number,
    featureFlag: Partial<IFeatureFlag>
  ): Promise<FeatureFlag> {
    const featureFlagIndex = featureFlagsInMemory.findIndex(
      (ff) => ff.id == id
    );

    featureFlagsInMemory[featureFlagIndex] = {
      ...featureFlagsInMemory[featureFlagIndex],
      ...featureFlag,
    };

    return featureFlagsInMemory[featureFlagIndex];
  }

  async deleteOne(id: number): Promise<boolean> {
    try {
      const featureFlagIndex = featureFlagsInMemory.findIndex(
        (ff) => ff.id == id
      );
      delete featureFlagsInMemory[featureFlagIndex];
      return true;
    } catch (error) {
      return false;
    }
  }
}
