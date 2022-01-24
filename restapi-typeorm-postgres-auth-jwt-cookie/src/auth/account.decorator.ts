import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAccount = createParamDecorator(
  (_data: string, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest()['account'],
);
