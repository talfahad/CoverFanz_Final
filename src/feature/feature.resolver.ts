import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizeUserType } from 'src/auth/decorator/authorize.decorator';
import { Feature, FeatureInput, FeatureIdInput } from './feature.schema';
import { FeatureService } from './feature.service';

@Resolver()
export class FeatureResolver {
  constructor(private readonly featureService: FeatureService) {}

  @AuthorizeUserType(['admin'])
  @Mutation(() => Feature)
  async createFeature(@Args('input') input: FeatureInput) {
    return this.featureService.createFeature(input);
  }

  @Query(() => [Feature])
  async getAllFeatures() {
    return this.featureService.getAllFeatures();
  }

  @Query(() => [String])
  async getAllFeaturesAsArray() {
    return this.featureService.getAllFeaturesAsArray();
  }

  @AuthorizeUserType(['admin'])
  @Query(() => Feature, { nullable: true })
  async deleteFeatureById(@Args('input') input: FeatureIdInput) {
    return this.featureService.deleteFeatureById(input);
  }
}
