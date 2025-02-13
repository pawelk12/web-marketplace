import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator<number>(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.userId;
  },
);
