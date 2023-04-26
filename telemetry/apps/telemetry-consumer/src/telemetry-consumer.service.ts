import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import RedisPublisher from '@app/redis/publisher/redis.publisher';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';

@Injectable()
export class TelemetryConsumerService {
  telemetryProducerClient: TelemetryProducerClient;

  redisPublisher: RedisPublisher;

  minerIds: string[];

  constructor(configService: ConfigService, telemetryProducerClient: TelemetryProducerClient, redisPublisher: RedisPublisher) {
    this.telemetryProducerClient = telemetryProducerClient;
    this.redisPublisher = redisPublisher;

    this.minerIds = configService.get<string>('MINERS')?.split(',');
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async get() {
    for (const minerId of this.minerIds) {
      try {
        const data = await this.telemetryProducerClient.getTelemetry(minerId);
        this.redisPublisher.publish(data);
      } catch (err: any) {
        console.error(err);
      }
      Logger.log(`Called GET /telemetry/${minerId}`);
    }
  }
}
