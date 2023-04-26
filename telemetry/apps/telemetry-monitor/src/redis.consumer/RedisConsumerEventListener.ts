import RedisRecord from './RedisRecord';

export default interface IRedisConsumerEventListener {
    listen(message: RedisRecord): void
};
