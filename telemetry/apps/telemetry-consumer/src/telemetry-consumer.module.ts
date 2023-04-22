import { Module } from '@nestjs/common';
import { TelemetryConsumerController } from './telemetry-consumer.controller';
import { TelemetryConsumerService } from './telemetry-consumer.service';

@Module({
  imports: [],
  controllers: [TelemetryConsumerController],
  providers: [TelemetryConsumerService],
})
export class TelemetryConsumerModule {}
