import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryProducerClient } from './telemetry.producer.client';

describe('TelemetryProducerClientService', () => {
  let service: TelemetryProducerClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetryProducerClient],
    }).compile();

    service = module.get<TelemetryProducerClient>(TelemetryProducerClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
