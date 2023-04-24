import { Injectable } from '@nestjs/common';

@Injectable()
export class TelemetryMonitorService {
  getHello(): string {
    return 'Hello World!';
  }
}
