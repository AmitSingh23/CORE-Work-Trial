import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import { TelemetryProducerClient } from './telemetry.producer.client';

describe('TelemetryProducerClientService', () => {
  let service: TelemetryProducerClient;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryProducerClient,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'host'),
          },
        },
      ],

    }).compile();

    service = module.get<TelemetryProducerClient>(TelemetryProducerClient);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a valid Miner Telemetry object', async () => {
    // mock GET response to producer
    const sampleJSON: string = JSON.parse(JSON.stringify(MinerTelemetryFactory.createNominalMinerTelemetry('1')));
    httpService.get.mockReturnValue(of({ data: sampleJSON } as AxiosResponse));

    const response = await service.getTelemetry('1');

    expect(httpService.get).toBeCalledTimes(1);
    expect(httpService.get).toBeCalledWith('host/telemetry/1');
    expect(response).toEqual(sampleJSON);
  });

  // we explicitly test this because this service is not expected to catch exceptions
  it('should throw exception when one is thrown by the httpService', async () => {
    httpService.get.mockImplementation(() => {
      throw new Error('fake-error');
    });

    let exceptionThrown = false;
    try {
      const response = await service.getTelemetry('1');
    } catch (error: any) {
      exceptionThrown = true;
    }

    expect(exceptionThrown).toBeTruthy();
  });
});
