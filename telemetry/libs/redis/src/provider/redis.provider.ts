import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export default class RedisProvider {
  private readonly redis: Redis;

  constructor(configService: ConfigService) {
    const host = configService.get<string>('REDIS_HOST');
    this.redis = new Redis(6379, host);
  }

  getRedis(): Redis {
    return this.redis;
  }
}
