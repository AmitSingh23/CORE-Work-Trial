import { Module } from '@nestjs/common';
import { TelemetryMonitorController } from './telemetry-monitor.controller';
import { TelemetryMonitorService } from './telemetry-monitor.service';

@Module({
  imports: [],
  controllers: [TelemetryMonitorController],
  providers: [TelemetryMonitorService],
})
export class TelemetryMonitorModule {}
