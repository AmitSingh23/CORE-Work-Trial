import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryProducerClient } from './telemetry.producer.client';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('TelemetryProducerClientService', () => {
  let service: TelemetryProducerClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetryProducerClient],
      imports: [ConfigModule, HttpModule]
    }).compile();

    service = module.get<TelemetryProducerClient>(TelemetryProducerClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
