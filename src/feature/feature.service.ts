import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Feature,
  FeatureDocument,
  FeatureInput,
  FeatureIdInput,
} from './feature.schema';

import { Model } from 'mongoose';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name)
    private featureModel: Model<FeatureDocument>,
  ) {}

  // Admin is Permitted Only
  async createFeature(input: FeatureInput) {
    const newFeature = await this.featureModel.create(input);

    return newFeature;
  }

  // Admin is Permitted Only
  async getAllFeatures() {
    const features = await this.featureModel.find();

    if (features.length === 0) {
      return null;
    }
    return features;
  }

  // Anyone Can Access
  async getAllFeaturesAsArray() {
    const features = await this.featureModel
      .find()
      .distinct('entertrainerFeature');

    if (features.length === 0) {
      return null;
    }
    return features;
  }

  // Admin is Permitted Only
  async deleteFeatureById(input: FeatureIdInput) {
    await this.featureModel.findByIdAndDelete(input._id);
    return null;
  }
}
