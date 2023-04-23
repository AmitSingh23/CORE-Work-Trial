import { Module } from '@nestjs/common';
import { TelemetryConsumerController } from './telemetry-consumer.controller';
import { TelemetryConsumerService } from './telemetry-consumer.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';
import RedisPublisher from './redis/redis.service';

@Module({
  imports: [ConfigModule.forRoot({ignoreEnvFile: true, isGlobal: true}), ScheduleModule.forRoot(), HttpModule],
  controllers: [TelemetryConsumerController],
  providers: [TelemetryConsumerService, TelemetryProducerClient, RedisPublisher],
})
export class TelemetryConsumerModule {}
