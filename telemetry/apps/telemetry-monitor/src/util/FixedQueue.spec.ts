import FixedSizeQueue from './FixedQueue';

describe('FixedQueue', () => {
  it('should allow pushing', () => {
    const q = new FixedSizeQueue<number>(10);

    q.push(1);
    q.push(2);
    q.push(3);

    expect(q.toString()).toEqual('3,2,1');
  });

  it('should never overflow', () => {
    const q = new FixedSizeQueue<number>(1);

    q.push(1);
    q.push(2);
    q.push(3);

    expect(q.toString()).toEqual('3');
  });

  it('should be iterable', () => {
    const q = new FixedSizeQueue<number>(5);

    q.push(1);
    q.push(2);
    q.push(3);
    q.push(4);
    q.push(5);
    q.push(6);
    q.push(7);
    q.push(8);
    q.push(9);

    const arr = [];

    for (const elem of q) {
      arr.push(elem);
    }

    expect(arr).toEqual([9, 8, 7, 6, 5]);
  });

  it('shouldn\'t fail with no elements', () => {
    const q = new FixedSizeQueue<number>(10);
  });
});
