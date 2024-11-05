import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = this.extractTokenFromRequest(request);
    if (!token)
      throw new UnauthorizedException('You have to log in to continue', {
        description: 'Missing token',
      });
    try {
      // check if token is valid
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('You have to log in to continue', {
        description: 'Invalid Access token',
      });
    }
  }

  extractTokenFromRequest(request: Request): string | null {
    const authorizationString =
      (request.headers['authorization'] as string) ?? null;
    if (authorizationString === null) {
      return null;
    }
    const bearerTokenSplit = authorizationString.split(' ');
    // return the second element which should be the actual token or null if there's no second element
    return bearerTokenSplit[1] ?? null;
  }
}
