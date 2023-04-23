import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export default class RedisPublisher {
  private readonly redis: Redis;

  constructor(configService: ConfigService) {
    const host = configService.get<string>('REDIS_HOST');
    this.redis = new Redis(6379, host);
  }

  public publish(telemetry: MinerTelemetry): Promise<string> {
    const payload = JSON.stringify(telemetry);
    return this.redis.xadd(`miner-telemetry:${telemetry.id}`, '*', 'payload', payload);
  }
}