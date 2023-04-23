import {
  Controller, Get, Inject, Param,
} from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
    @Inject()
    private telemetryService: TelemetryService;

    @Get(':id')
    getTelemetry(@Param('id') id: string) {
      return this.telemetryService.getMinerTelemetry(id);
    }
}
