import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelemetryModule } from './telemetry/telemetry.module';
import { AppController } from './app.controller';

@Module({
  imports: [TelemetryModule, ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
