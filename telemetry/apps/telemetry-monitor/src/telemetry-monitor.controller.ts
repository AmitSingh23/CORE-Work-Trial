import { Controller, Get } from '@nestjs/common';
import { TelemetryMonitorService } from './telemetry-monitor.service';

@Controller()
export class TelemetryMonitorController {
  constructor(private readonly telemetryMonitorService: TelemetryMonitorService) {}

  @Get()
  getHello(): string {
    return this.telemetryMonitorService.getHello();
  }
}
