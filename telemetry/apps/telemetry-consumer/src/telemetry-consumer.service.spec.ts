import { ConfigService } from "@nestjs/config";
import { TelemetryConsumerService } from "./telemetry-consumer.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TelemetryProducerClient } from "./telemetry.producer.client/telemetry.producer.client";
import RedisPublisher from "./redis/publisher/redis.publisher";
import { createMock } from "@golevelup/ts-jest";


describe('TelemetryConsumerService', () => {
  let service: TelemetryConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryConsumerService,
        {
          provide: TelemetryProducerClient,
          useValue: createMock<TelemetryProducerClient>()
        }, 
        {
          provide: RedisPublisher,
          useValue: createMock<RedisPublisher>()
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return 'host'
            })
          }
      }
    ]}).compile();

    service = module.get<TelemetryConsumerService>(TelemetryConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
