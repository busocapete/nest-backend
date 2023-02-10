import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AdminGuard } from '../auth/guard/admin.guard';
import { JwtGuard, OrganisationGuard } from '../auth/guard';
import { CreateOrgansiationDto } from './dto/create-organisation.dto';
import { OrganisationService } from './organisation.service';

@UseGuards(JwtGuard)
@Controller('organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  @Version('1')
  //Required @Guard for authorization
  //@Guard requires role for emnify admin, emnify staff
  //org admin, org user etc
  // Auth to protect org / billing endpoints,
  // i.e. only emnify accounts can access all bills
  // only return org to owner of org.

  //Would require @Headers
  //Custom header for external orgs API Key
  //Could also include custom headers for fields to return...
  @UseGuards(OrganisationGuard)
  async getOrganisation(
    @Headers() headers,
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const orgToReturn = await this.organisationService.findById(id);
    if (headers.apikey !== undefined) {
      console.log(headers.apikey);
    }
    console.log(headers);
    //test organisation exists to return 404 when null
    if (orgToReturn === null) {
      throw new HttpException('Organisation Not Found', HttpStatus.NOT_FOUND);
    }

    //would map org to return to a response Dto
    //to control fields returned.
    //May want different returned based on roles.
    //example on bill controller @Get(':id') method
    return orgToReturn;
  }

  @Get()
  @Version('1')
  //as above.  only return to emnify admin.
  @UseGuards(AdminGuard)
  async getOrganisationList() {
    return this.organisationService.findAll();
  }

  @Post()
  @Version('1')
  //only accessible by emnify admin
  async create(@Body() createOrganisationDto: CreateOrgansiationDto) {
    return this.organisationService.create(createOrganisationDto);
  }

  @HttpCode(204)
  @Delete(':id')
  //shouldn't entirely remove an org.
  // would set a boolen isDeleted on org entity
  remove(@Param('id') id: string) {
    return this.organisationService.remove(id);
  }
}
