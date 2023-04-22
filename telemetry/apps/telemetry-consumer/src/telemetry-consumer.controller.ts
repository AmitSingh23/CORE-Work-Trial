import { Controller, Get } from '@nestjs/common';
import { TelemetryConsumerService } from './telemetry-consumer.service';

@Controller()
export class TelemetryConsumerController {
  constructor(private readonly telemetryConsumerService: TelemetryConsumerService) {}

  @Get()
  getHello(): string {
    return this.telemetryConsumerService.getHello();
  }
}
