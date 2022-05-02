import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UserTypeGuard } from '../guards/userType.guard';

export const AuthorizeUserType = (userType: string | string[]) =>
  applyDecorators(
    SetMetadata('userType', [userType].flat()),
    UseGuards(GqlAuthGuard, UserTypeGuard),
  );
