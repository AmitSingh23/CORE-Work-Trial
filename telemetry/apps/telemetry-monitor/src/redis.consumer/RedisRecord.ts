
export default interface RedisRecord {
    id: string;
    stream: string;
    payload: {
        _id: string,
        _hashrate: number,
        _health: boolean,
        _pool: boolean
        _fans: [
            number,
            number,
            number,
            number
        ],
        _temp: [
            {
                _intake: number, 
                _out: number
            },
        ]
    }
};
