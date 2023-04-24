import { Module } from '@nestjs/common';
import RedisPublisher from './publisher/redis.publisher';
import { RedisProvider } from './provider/redis.provider';

@Module({
  providers: [RedisPublisher, RedisProvider],
  exports: [RedisPublisher, RedisProvider]
})
export class RedisModule {}
