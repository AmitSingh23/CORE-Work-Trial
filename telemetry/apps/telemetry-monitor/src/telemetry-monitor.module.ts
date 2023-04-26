import { Module } from '@nestjs/common';
import RedisProvider from '@app/redis/provider/redis.provider';
import { ConfigModule } from '@nestjs/config';
import { TelemetryMonitorController } from './telemetry-monitor.controller';
import { TelemetryMonitorService } from './telemetry-monitor.service';
import RedisConsumerService from './redis.consumer/redis.consumer.service';
import DefaultRedisConsumerEventListener from './redis.consumer/EventListener';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true })],
  controllers: [TelemetryMonitorController],
  providers: [TelemetryMonitorService, RedisConsumerService, RedisProvider, { provide: 'RedisConsumerEventListener', useClass: DefaultRedisConsumerEventListener }],
})
export class TelemetryMonitorModule {}
