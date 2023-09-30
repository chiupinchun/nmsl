import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

export const Auth = createParamDecorator((_: undefined, ctx: ExecutionContext) => {
  const id: string = ctx.switchToHttp().getRequest().id;
  if (!id) throw new UnauthorizedException();
  return id;
});
