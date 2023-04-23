import { Module } from '@nestjs/common';
import { TelemetryConsumerController } from './telemetry-consumer.controller';
import { TelemetryConsumerService } from './telemetry-consumer.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), ScheduleModule.forRoot(), HttpModule],
  controllers: [TelemetryConsumerController],
  providers: [TelemetryConsumerService, TelemetryProducerClient],
})
export class TelemetryConsumerModule {}
