export interface IFeatureFlag {
  id: string;
  name: string;
}

export class FeatureFlag implements IFeatureFlag {
  id: string;
  name: string;

  constructor(name) {
    this.name = name;
  }
}
