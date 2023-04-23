import { Module } from '@nestjs/common';
import { TelemetryConsumerService } from './telemetry-consumer.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';
import { RedisModule } from './redis/redis.module';
import { RedisProvider } from './redis.provider/redis.provider';

@Module({
  imports: [ConfigModule.forRoot({ignoreEnvFile: true, isGlobal: true}), ScheduleModule.forRoot(), HttpModule, RedisModule],
  controllers: [],
  providers: [TelemetryConsumerService, TelemetryProducerClient, RedisProvider],
})
export class TelemetryConsumerModule {}
