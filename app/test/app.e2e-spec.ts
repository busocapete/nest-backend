import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { CreateTariffDto } from 'src/tariff/dto/create-tariff.dto';
import { CreateCurrencyDto } from 'src/currency/dto/create-currency.dto';
import { CreateOrgansiationDto } from 'src/organisation/dto/create-organisation.dto';
import { CreateSimDto } from 'src/sim/dto/create-sim.dto';
const baseUrl = 'http://localhost:8001';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //Would realistically want to work with
  //much larger dataset of mock data
  //to monitor repsonse times for
  //requests with high volume of cdrs &| sims

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    await app.init();
    await app.listen(8001);

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

  //TESTS FOR BILLING IMPLEMENTATION
  describe('Bills', () => {
    describe('Get bill for org 2 GBP', () => {
      it('Should return bill org 2 - total cost £132.65, IV, sub cost 66, currency GBP', () => {
        return pactum
          .spec()
          .get('/organisations/2/bill')
          .expectStatus(200)
          .expectJson('data.organisation.name', 'Hudson Elevators')
          .expectJson('data.organisation.tariff.tariffId', 2)
          .expectJson('data.organisation.tariff.isPayg', false)
          .expectJson('data.organisation.totalSubscriptionCost', 66)
          .expectJson('data.organisation.defaultCurrency.symbol', '£')
          .expectJson('data.organisation.displayTotalBillCost', '£132.65')
          .inspect();
      });

      //TESTS MULTI-CURRENCY IMPLEMENTATION
      describe('Get bill for org 2 EUR', () => {
        it('Should return org 2 - total cost €150.74, IV, sub cost 75, currency EUR', () => {
          return pactum
            .spec()
            .get('/organisations/2/bill?currency=EUR')
            .expectStatus(200)
            .expectJson('data.organisation.name', 'Hudson Elevators')
            .expectJson('data.organisation.tariff.tariffId', 2)
            .expectJson('data.organisation.tariff.isPayg', false)
            .expectJson('data.organisation.totalSubscriptionCost', 75)
            .expectJson('data.organisation.defaultCurrency.symbol', '£')
            .expectJson('data.organisation.displayTotalBillCost', '€150.74')
            .expectJson('data.billDisplayCurrency.rate', '1.00')
            .inspect();
        });
      });
      describe('Get bill for org 3', () => {
        it('Should return bill for org 3 - - total cost $1810.71, IV, sub cost 0, currency USD', () => {
          return pactum
            .spec()
            .get('/organisations/3/bill')
            .expectStatus(200)
            .expectJson('data.organisation.name', 'Tree Water Systems')
            .expectJson('data.organisation.tariff.tariffId', 3)
            .expectJson('data.organisation.tariff.isPayg', true)
            .expectJson('data.organisation.totalSubscriptionCost', 0)
            .expectJson('data.organisation.defaultCurrency.symbol', '$')
            .expectJson('data.organisation.displayTotalBillCost', '$1810.71')
            .expectJson('data.billDisplayCurrency.rate', '1.07')
            .inspect();
        });
      });
    });
  });

  //ORGANISATION TESTS
  describe('Organisations', () => {
    const org1Dto: CreateOrgansiationDto = {
      name: 'Awsome Trackers Test',
      defaultCurrencyId: 1,
      tariffId: 1,
    };
    describe('Get organisations', () => {
      it('Should get list of organisations from seed data', () => {
        return pactum
          .spec()
          .get('/organisations')
          .expectStatus(200)
          .expectJsonLength(3);
      });
    });

    describe('Create Organisation', () => {
      it('Should create an organisation', () => {
        return pactum
          .spec()
          .post('/organisations')
          .withBody(org1Dto)
          .expectStatus(201)
          .stores('createdOrganisationId', 'organisationId');
      });
    });

    describe('Get organisation by id', () => {
      it('Should return organisation just created from 201 response Id', () => {
        return pactum
          .spec()
          .get('/organisations/$S{createdOrganisationId}')
          .expectStatus(200)
          .stores('organisationName', 'name')
          .stores('organisationTariff', 'tariff')
          .inspect();
      });
    });
    describe('Get organisations including insert', () => {
      it('Should return 4 organsations from seed data + created', () => {
        return pactum
          .spec()
          .get('/organisations')
          .expectStatus(200)
          .expectJsonLength(4);
      });
    });

    describe('Delete Organisation', () => {
      it('should delete the newly created org', () => {
        return pactum
          .spec()
          .delete('/organisations/$S{createdOrganisationId}')
          .expectStatus(204);
      });
    });
    describe('Get organisation by id', () => {
      it('should return 404 as org now deleted', () => {
        return pactum
          .spec()
          .get('/organisations/$S{createdOrgansationId}')
          .expectStatus(404);
      });
    });

    describe('Get organisations after delete', () => {
      it('Should return organisations from seed data - return 3 orgs', () => {
        return pactum
          .spec()
          .get('/organisations')
          .expectStatus(200)
          .expectJsonLength(3);
      });
    });
  });

  //TARIFF TESTS - TESTS IMPLEMENTATION OF INCLUSIVE VOLUME AND PAYG
  describe('Tariffs', () => {
    const tariff1Dto: CreateTariffDto = {
      name: 'Inclusive Test Standard',
      subscriptionCostPerSim: 10,
      inclusiveVolume: 50,
      isPayg: false,
      activeFrom: new Date(Date.now()),
    };
    describe('Create a tariff', () => {
      it('Should create a tariff', () => {
        return pactum
          .spec()
          .post('/tariffs')
          .withBody(tariff1Dto)
          .expectStatus(201)
          .stores('createdTariffId', 'tariffId');
      });
    });
    describe('Get tariffs', () => {
      it('Should return a list of 4 tariffs - 3 Seeded + 1 Created', () => {
        return pactum
          .spec()
          .get('/tariffs')
          .expectStatus(200)
          .expectJsonLength(4)
          .expectBodyContains('Inclusive Test Standard');
      });
    });

    describe('Delete created tariff', () => {
      it('Should delete tariff', () => {
        return pactum
          .spec()
          .delete('/tariffs/$S{createdTariffId}')
          .expectStatus(204);
      });
    });

    describe('Get tariffs after delete', () => {
      it('Should return the three original tariffs', () => {
        return pactum
          .spec()
          .get('/tariffs')
          .expectStatus(200)
          .expectJsonLength(3);
      });
    });
  });

  //CURRENCY TESTS
  describe('Currencies', () => {
    const currency1Dto: CreateCurrencyDto = {
      name: 'EUR',
      rate: 1,
      symbol: '€',
    };

    it('should create currency', () => {
      return pactum
        .spec()
        .post('/currencies')
        .withBody(currency1Dto)
        .expectStatus(201)
        .stores('createdCurrencyId', 'currencyId');
    });

    describe('Get currencies', () => {
      it('should return list of available currencies, 4 with newly created', () => {
        return pactum
          .spec()
          .get('/currencies')
          .expectStatus(200)
          .expectJsonLength(4);
      });
    });
    describe('Delete created currency', () => {
      it('Should delete currency and return 204', () => {
        return pactum
          .spec()
          .delete('/currencies/$S{createdCurrencyId}')
          .expectStatus(204);
      });
    });

    describe('Get tariffs after delete', () => {
      it('Should return the three original currencies', () => {
        return pactum
          .spec()
          .get('/currencies')
          .expectStatus(200)
          .expectJsonLength(3);
      });
    });
  });

  //SIM TESTS
  describe('Sims', () => {
    const sim1Dto: CreateSimDto = {
      organisationId: 1,
    };

    describe('Create Sims', () => {
      it('should create sim 1', () => {
        return pactum
          .spec()
          .post('/sims')
          .withBody(sim1Dto)
          .expectStatus(201)
          .stores('createdSimId', 'simId');
      });
      describe('Get sims', () => {
        it('list of sims', () => {
          return pactum
            .spec()
            .get('/sims')
            .expectStatus(200)
            .expectJsonLength(10);
        });
      });

      describe('Delete Sim', () => {
        it('should delete the newly created sim', () => {
          return pactum
            .spec()
            .delete('/sims/$S{createdSimId}')
            .expectStatus(204)
            .inspect();
        });
      });
    });
  });
});
