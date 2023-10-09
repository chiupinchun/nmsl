import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(UserService) private userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { id } = await this.jwtService.verifyAsync<{ id: string; }>(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // const user = await this.userService.findOne({ id });
      // request['user'] = user;
      request['id'] = id;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookie = request.headers.cookie;

    const token = cookie?.split('; ')?.find(item => /^token=/.test(item))?.split('=')?.slice(1)?.join('=');

    return token;
  }
}