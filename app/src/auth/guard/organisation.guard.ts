import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrganisationService } from '../../organisation/organisation.service';

@Injectable()
export class OrganisationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly organisationService: OrganisationService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const headers = request.headers;
    console.log(headers);

    const suppliedApiKey = headers.apikey;
    console.log(suppliedApiKey);
    //get organisationId parameter from the request.
    const orgIdParam = Number.parseInt(request.params.id);

    const organisation = await this.organisationService.findById(orgIdParam);
    console.log(organisation.name);
    //if user is admin give access
    if (user.isAdmin) {
      return true;
    }

    //if user is not from organisation return unauthorized
    if (
      !user ||
      user.organisationId !== orgIdParam ||
      organisation.apiKey !== suppliedApiKey
    ) {
      throw new UnauthorizedException();
    }

    //user must have correct orgId, allow access
    return true;
  }
}
