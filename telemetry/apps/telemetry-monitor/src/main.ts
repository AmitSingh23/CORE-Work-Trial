import { NestFactory } from '@nestjs/core';
import { TelemetryMonitorModule } from './telemetry-monitor.module';

async function bootstrap() {
  const app = await NestFactory.create(TelemetryMonitorModule);
  await app.listen(3000);
}
bootstrap();
