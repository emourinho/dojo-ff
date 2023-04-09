export interface IFeatureFlag {
  id: number;
  name: string;
  enabled: boolean;
}

export class FeatureFlag implements IFeatureFlag {
  id: number;
  name: string;
  enabled: boolean;

  constructor(name) {
    this.name = name;
  }
}
