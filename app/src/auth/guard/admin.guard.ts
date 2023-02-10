import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log('In admin Guard');
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    console.log('headers in admin guard', headers);
    const user = request.user;
    console.log(user);

    //if user is admin give access
    if (!user.isAdmin) {
      //Not admin - throw unauthorized exectpion
      throw new UnauthorizedException();
    } else {
      return true;
    }
  }
}
