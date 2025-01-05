import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  private decodeAuthHeader(header: string) {
    const b64auth = header.split(' ')[1];
    if (!b64auth) return undefined;

    const decodedB64 = Buffer.from(b64auth, 'base64').toString();
    const colonIndex = decodedB64.indexOf(':');
    if (colonIndex === -1) return undefined;

    const email = decodedB64.substring(0, colonIndex);
    const password = decodedB64.substring(colonIndex + 1);

    return {
      email,
      password,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) {
      throw new UnauthorizedException();
    }

    const credentials = this.decodeAuthHeader(auth);
    if (!credentials || !credentials.email || !credentials.password) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.verify(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    request.userId = user.id;
    return true;
  }
}
