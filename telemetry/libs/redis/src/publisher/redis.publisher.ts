import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import { Injectable } from '@nestjs/common';
import { RedisProvider } from '../provider/redis.provider';

@Injectable()
export default class RedisPublisher {
  private readonly redis: RedisProvider;

  constructor(redisProvider: RedisProvider) {
    this.redis = redisProvider;
  }

  publish(telemetry: MinerTelemetry): Promise<string> {
    const payload = JSON.stringify(telemetry);
    return this.redis.getRedis().xadd(`miner-telemetry:${telemetry.id}`, '*', 'payload', payload);
  }

  getRedisProvider(): RedisProvider {
    return this.redis;
  }
}
