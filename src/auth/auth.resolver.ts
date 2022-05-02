import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import Ctx from 'src/types/context.type';
import { User, LoginUserInput, UserIdInput } from 'src/user/user.schema';
import { AuthService } from './auth.service';
import { AuthorizeUserType } from './decorator/authorize.decorator';
import { CurrentUser } from './decorator/currentUser.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { nullable: true })
  async login(@Args('input') input: LoginUserInput, @Context() context: Ctx) {
    return this.authService.login(input, context);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async deleteMe(@CurrentUser() c_user: User, @Context() context: Ctx) {
    return this.authService.deleteMe(c_user._id, context);
  }

  @AuthorizeUserType(['admin'])
  @Query(() => User)
  async deleteUserByAdmin(@Args('input') input: UserIdInput) {
    return this.authService.deleteUserByAdmin(input._id);
  }

  @Query(() => User, { nullable: true })
  async logout(@Context() context: Ctx) {
    return this.authService.logout(context);
  }
}
