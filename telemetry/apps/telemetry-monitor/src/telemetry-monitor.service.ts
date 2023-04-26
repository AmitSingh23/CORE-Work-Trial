import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisConsumerService from './redis.consumer/redis.consumer.service';
import IRedisConsumerEventListener from './redis.consumer/RedisConsumerEventListener';

@Injectable()
export class TelemetryMonitorService implements OnModuleInit {
  private redisConsumerService: RedisConsumerService;

  private streams: string[];

  constructor(redisConsumerService: RedisConsumerService, configService: ConfigService, @Inject('RedisConsumerEventListener') eventListener: IRedisConsumerEventListener) {
    this.redisConsumerService = redisConsumerService;

    this.redisConsumerService.on('redis-message-consumed', eventListener.listen.bind(eventListener));

    this.streams = configService.get<string>('MINERS')?.split(',')?.map((it) => `miner-telemetry:${it}`);
  }

  onModuleInit() {
    this.redisConsumerService.start(this.streams);
  }
}
