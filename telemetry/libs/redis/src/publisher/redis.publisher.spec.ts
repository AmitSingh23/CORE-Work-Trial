import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import RedisPublisher from './redis.publisher';
import RedisProvider from '../provider/redis.provider';

const mockRedis = {
  xadd: (...args) => ({}),
};

const mockRedisProvider = {
  getRedis: () => mockRedis,
};

describe('RedisService', () => {
  let service: RedisPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        RedisPublisher,
        {
          provide: RedisProvider,
          useValue: mockRedisProvider,
        },
      ],
    })
      .compile();

    service = module.get<RedisPublisher>(RedisPublisher);

    jest.clearAllMocks();

    jest.spyOn(service.getRedisProvider().getRedis(), 'xadd').mockImplementation();
    jest.spyOn(service, 'publish');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call xadd when calling publish', () => {
    service.publish(MinerTelemetryFactory.createNominalMinerTelemetry('random-id'));

    expect(service.getRedisProvider().getRedis().xadd).toHaveBeenCalledTimes(1);
    expect(service.getRedisProvider().getRedis().xadd).toHaveBeenCalledWith('miner-telemetry:random-id', '*', 'payload', expect.any(String));
  });
});
