import { Test, TestingModule } from '@nestjs/testing';
import RedisPublisher from './redis.service';
import { ConfigModule } from '@nestjs/config';

describe('RedisService', () => {
  let service: RedisPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [RedisPublisher],
    }).compile();

    service = module.get<RedisPublisher>(RedisPublisher);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
