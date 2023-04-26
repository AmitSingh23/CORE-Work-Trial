import { Module } from '@nestjs/common';
import RedisPublisher from './src/publisher/redis.publisher';
import RedisProvider from './src/provider/redis.provider';

@Module({
  providers: [RedisPublisher, RedisProvider],
  exports: [RedisPublisher, RedisProvider],
})
export class RedisModule {}
