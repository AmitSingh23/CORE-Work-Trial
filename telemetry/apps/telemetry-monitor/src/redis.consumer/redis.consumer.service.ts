import { RedisProvider } from '@app/redis/provider/redis.provider';
import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'stream';
import RedisRecord from './RedisRecord';

@Injectable()
export default class RedisConsumerService extends EventEmitter {
  private lastIds: Record<string, string>;

  private redisProvider: RedisProvider;

  constructor(redisProvider: RedisProvider) {
    super();
    this.redisProvider = redisProvider;
  }

  async start(streams: string[]): Promise<void> {
    this.lastIds = {};
    for (const stream of streams) {
      this.lastIds[stream] = '0';
    }

    while (true) {
      try {
        const streamEntries = await this.redisProvider.getRedis().xread(
          'BLOCK',
          0,
          'STREAMS',
          ...streams,
          ...Object.values(this.lastIds),
        );

        streamEntries.forEach(([stream, entries]) => {
          entries.forEach(([id, fields]) => {
            this.lastIds[stream] = id;
            this.emit('redis-message-consumed', { id, stream, payload: JSON.parse(fields[1])} as RedisRecord);
          });
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  }
}

// // Example usage
// const redis = new Redis();
// const reader = new RedisConsumerService(redis, ['stream1', 'stream2']);

// reader.start();
