import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelemetryConsumerService } from './telemetry-consumer.service';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';
import { RedisModule } from '../../../libs/redis/redis.module';
import { RedisProvider } from '../../../libs/redis/src/provider/redis.provider';

@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }), ScheduleModule.forRoot(), HttpModule, RedisModule],
  controllers: [],
  providers: [TelemetryConsumerService, TelemetryProducerClient, RedisProvider],
})
export class AppModule {}
