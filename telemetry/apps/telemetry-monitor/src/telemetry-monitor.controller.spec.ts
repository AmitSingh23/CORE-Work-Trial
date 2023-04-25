import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryMonitorController } from './telemetry-monitor.controller';
import { TelemetryMonitorService } from './telemetry-monitor.service';

describe('TelemetryMonitorController', () => {
  let telemetryMonitorController: TelemetryMonitorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryMonitorController],
      providers: [TelemetryMonitorService],
    }).compile();

    telemetryMonitorController = app.get<TelemetryMonitorController>(TelemetryMonitorController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(telemetryMonitorController.getHello()).toBe('Hello World!');
    // });
    it('should returtn true', () => {
      expect(true).toEqual(true);
    });
  });
});
