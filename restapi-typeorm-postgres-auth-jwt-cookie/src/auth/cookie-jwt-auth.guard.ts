import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Account } from './account.interface';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class CookieJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(CookieJwtAuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const accessToken = req.cookies['access_token'];
    if (!accessToken) {
      this.logger.log('Request has no access_token');
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify<JwtPayload>(accessToken);
      const account: Account = {
        id: payload.id,
        username: payload.username,
      };
      req['account'] = account;
      return true;
    } catch (e) {
      this.logger.log('Invalid Access');
      throw new UnauthorizedException();
    }
  }
}
