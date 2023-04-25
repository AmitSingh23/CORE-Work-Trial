import { Injectable, OnModuleInit } from '@nestjs/common';
import RedisConsumerService from './redis.consumer/redis.consumer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelemetryMonitorService implements OnModuleInit {
  private redisConsumerService: RedisConsumerService;
  private streams: string[];

  constructor(redisConsumerService: RedisConsumerService, configService: ConfigService) {
    this.redisConsumerService = redisConsumerService;
    this.streams = configService.get<string>('MINERS')?.split(',')?.map(it => `miner-telemetry:${it}`);
  }

  onModuleInit() {
    this.redisConsumerService.start(this.streams);
  }
}
