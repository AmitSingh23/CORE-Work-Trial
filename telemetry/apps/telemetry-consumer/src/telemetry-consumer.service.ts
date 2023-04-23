import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelemetryProducerClient } from './telemetry.producer.client/telemetry.producer.client';

@Injectable()
export class TelemetryConsumerService {

  @Inject()
  telemetryProducerClient: TelemetryProducerClient

  minerIds: string[] = ["1", "2", "3"];

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async get() {
    console.log('5 seconds');

    const data = await this.telemetryProducerClient.getTelemetry(this.minerIds[0]);

    console.log(data);
  }
}
