import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import ContractValidator from '@app/test-utils/ContractValidator';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(ConfigService)
    .useValue({
      get: () => {
        return "1,2,3"
      }
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('expect valid response and 200 when miner exists', () => request(app.getHttpServer())
    .get('/telemetry/1')
    .expect(200)
    .then((response) => {
      ContractValidator.validateJSON(response.body);
    })
  );

  it('expect 404 when miner does not exist', () => request(app.getHttpServer())
    .get('/telemetry/5')
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("Miner(5) was not found");
    })
  );

});
