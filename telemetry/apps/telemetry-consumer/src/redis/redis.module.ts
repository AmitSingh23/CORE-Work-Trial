import { Module } from '@nestjs/common';
import RedisPublisher from './redis.service';
import { RedisProvider } from '../redis.provider/redis.provider';

@Module({
  providers: [RedisPublisher, RedisProvider],
  exports: [RedisPublisher, RedisProvider]
})
export class RedisModule {}
