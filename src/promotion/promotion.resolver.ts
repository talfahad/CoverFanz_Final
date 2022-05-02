import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/user.schema';
import {
  Promotion,
  PromotionInput,
  PromotionIdInput,
} from './promotion.schema';
import { PromotionService } from './promotion.service';

@Resolver()
export class PromotionResolver {
  constructor(private readonly promotionService: PromotionService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Promotion)
  async createPromotion(
    @Args('input') input: PromotionInput,
    @CurrentUser() user: User,
  ) {
    return this.promotionService.createPromotion(input, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Promotion, { nullable: true })
  async deletePromotionById(
    @Args('input') input: PromotionIdInput,
    @CurrentUser() user: User,
  ) {
    return this.promotionService.deletePromotionById(input, user._id);
  }
}
