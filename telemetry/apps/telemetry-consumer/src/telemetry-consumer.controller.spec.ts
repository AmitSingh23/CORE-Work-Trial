import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryConsumerController } from './telemetry-consumer.controller';
import { TelemetryConsumerService } from './telemetry-consumer.service';

describe('TelemetryConsumerController', () => {
  let telemetryConsumerController: TelemetryConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryConsumerController],
      providers: [TelemetryConsumerService],
    }).compile();

    telemetryConsumerController = app.get<TelemetryConsumerController>(TelemetryConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(telemetryConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
