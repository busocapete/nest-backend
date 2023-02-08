import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
const baseUrl = 'http://localhost:3004';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    await app.init();
    await app.listen(3004);

    pactum.request.setBaseUrl(baseUrl);
  });

  afterAll(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello EMnify!');
  });

  describe('Organisation', () => {
    describe('Get organisations', () => {
      it('should get list of organisations', () => {
        return pactum.spec().get('/organisation').expectStatus(200);
      });
    });
    describe('Get organisation by id', () => {
      it('should return an organisation with the id', () => {
        return pactum
          .spec()
          .get('/organisation/{id}')
          .withPathParams('id', '1')
          .expectStatus(200)
          .expectBodyContains('Awesome Trackers INC.')
          .expectBodyContains('Inclusive Standard')
          .stores('organisationName', 'name')
          .stores('organisationTariff', 'tariff');
      });
    });
  });
  describe('Get Bills', () => {
    describe('Get organisation bill', () => {
      it('should return org bill with tariff stored on getById', () => {
        return pactum
          .spec()
          .get('/organisation/{id}/bill')
          .withPathParams('id', '1')
          .expectStatus(200)
          .expectBodyContains('$S{organisationTariff}')
          .expectBodyContains('$S{organisationName}')
          .stores('orgTotalBill', 'organisation.data.totalBillCost');
      });
    });
    describe('Get bill in GBP', () => {
      it('should return a bill with GBP in the billDisplayCurrency', () => {
        return pactum
          .spec()
          .get('/organisation/{id}/bill?currency=GBP')
          .withPathParams('id', '1')
          .expectStatus(200)
          .expectBodyContains('£47.05')
          .stores('orgTotalBillGBP', 'organisation.data.totalBillCost');
      });
    });
  });
  describe('Get currencies', () => {
    it('list of available currencies', () => {
      return pactum
        .spec()
        .get('/currency')
        .expectStatus(200)
        .expectJsonLength(3);
    });
  });
  describe('Get tariffs', () => {
    it('list of available tariffs', () => {
      return pactum.spec().get('/tariff').expectStatus(200).expectJsonLength(3);
    });
  });
  describe('Get sims', () => {
    it('list of sims', () => {
      return pactum.spec().get('/sim').expectStatus(200);
    });
  });
});
