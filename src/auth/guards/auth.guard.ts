import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  publicRoutes: string[] = ['/auth/signup', '/auth/login', '/doc', '/'];

  refreshRoute: string = '/auth/refresh';

  canActivate(context: ExecutionContext) {
    const { url, body } = context.switchToHttp().getRequest();

    if (url === this.refreshRoute) {
      if (!body?.refreshToken) {
        throw new UnauthorizedException();
      }

      return true;
    }

    if (url && this.publicRoutes.includes(url)) {
      return true;
    }

    return super.canActivate(context);
  }
}
