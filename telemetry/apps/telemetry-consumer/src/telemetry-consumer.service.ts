import { Injectable } from '@nestjs/common';

@Injectable()
export class TelemetryConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
