import { NestFactory } from '@nestjs/core';
import { TelemetryConsumerModule } from './telemetry-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(TelemetryConsumerModule);
  await app.listen(3000);
}
bootstrap();
