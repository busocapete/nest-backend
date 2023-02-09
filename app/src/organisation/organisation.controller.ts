import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Version,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateOrgansiationDto } from './dto/create-organisation.dto';
import { OrganisationService } from './organisation.service';

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
  async getOrganisation(@Param('id', ParseIntPipe) id: number) {
    const orgToReturn = await this.organisationService.findById(id);

    //test organisation exists to return 404 when null
    if (orgToReturn === null) {
      throw new HttpException('Organisation Not Found', HttpStatus.NOT_FOUND);
    }

    //would map org to return to a response Dto
    //to control which data is returned.
    //likely want different data retuned based on roles.
    //example on bill controller @Get(':id') method
    return orgToReturn;
  }

  @Get()
  @Version('1')
  //as above.  only return to emnify admin.
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
