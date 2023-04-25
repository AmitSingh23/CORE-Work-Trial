import { ConfigService } from "@nestjs/config";
import { TelemetryConsumerService } from "./telemetry-consumer.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TelemetryProducerClient } from "./telemetry.producer.client/telemetry.producer.client";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import RedisPublisher from "@app/redis/publisher/redis.publisher";


describe('TelemetryConsumerService', () => {
  let service: TelemetryConsumerService;
  let client: DeepMocked<TelemetryProducerClient>;
  let redis: DeepMocked<RedisPublisher>;

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
            get: jest.fn((key: string) => {
                return "1,2,3,4,5"              
            })
          }
      }
    ]}).compile();

    service = module.get<TelemetryConsumerService>(TelemetryConsumerService);
    client = module.get(TelemetryProducerClient);
    redis = module.get(RedisPublisher);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process all miner ids', async () => {
    await service.get();

    expect(client.getTelemetry).toBeCalledTimes(5);
    expect(redis.publish).toBeCalledTimes(5);
  });

  it('should continue processing miners if a GET request fails', async () => {
    client.getTelemetry.mockImplementationOnce(async (id) => {
      throw new Error('fake-error');
    })

    await service.get();

    // still call this every time
    expect(client.getTelemetry).toBeCalledTimes(5);

    // this will have been called 4 times because the first call failed 
    expect(redis.publish).toBeCalledTimes(4);
  })

  it('should continue processing miners if a redis publish fails',async () => {
    redis.publish.mockImplementationOnce((minerTelemetry) => {
      throw new Error('fake-error');
    })

    await service.get();

    // still call this every time
    expect(client.getTelemetry).toBeCalledTimes(5);

    // this will still have been called 5 times because the first call failed but it still happened
    expect(redis.publish).toBeCalledTimes(5);
  })
});
