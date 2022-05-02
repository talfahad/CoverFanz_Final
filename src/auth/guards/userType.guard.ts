import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const userType = this.reflector.get<string[]>(
      'userType',
      context.getHandler(),
    );

    if (context.getType() === 'http') {
      const dbUserType = context.switchToHttp().getRequest().user.userType;
      const isPermitted = userType.includes(dbUserType);

      return isPermitted;
    }

    const ctx = GqlExecutionContext.create(context);
    const dbUserType = ctx.getContext().req.user.userType;
    const isPermitted = userType.includes(dbUserType);

    return isPermitted;
  }
}
