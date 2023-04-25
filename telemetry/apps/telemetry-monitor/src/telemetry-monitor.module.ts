import { Module } from '@nestjs/common';
import { TelemetryMonitorController } from './telemetry-monitor.controller';
import { TelemetryMonitorService } from './telemetry-monitor.service';
import RedisConsumerService from './redis.consumer/redis.consumer.service';
import { RedisProvider } from '@app/redis/provider/redis.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, ignoreEnvFile: true})],
  controllers: [TelemetryMonitorController],
  providers: [TelemetryMonitorService, RedisConsumerService, RedisProvider],
})
export class TelemetryMonitorModule {}
