import { Injectable } from '@nestjs/common';
import IRedisConsumerEventListener from './RedisConsumerEventListener';
import RedisRecord from './RedisRecord';

@Injectable()
export default class DefaultRedisConsumerEventListener implements IRedisConsumerEventListener {
  listen(message: RedisRecord): void {
    console.log(`Received entry ${message.id} from stream ${message.stream}:`, JSON.parse(message.fields[1]));
  }
}
