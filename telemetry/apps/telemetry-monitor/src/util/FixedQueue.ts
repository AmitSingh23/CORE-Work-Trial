export default class FixedSizeQueue<T> implements Iterable<T> {
  private array: T[];

  private maxSize: number;

  constructor(maxSize: number) {
    this.array = [];
    this.maxSize = maxSize;

    if (maxSize <= 0) {
      throw new RangeError('maxSize should be a positive number');
    }
  }

  push(element: T) {
    this.array.unshift(element);

    if (this.array.length > this.maxSize) {
      this.array.pop();
    }
  }

  toString(): string {
    return this.array.toString();
  }

  * [Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.array.length; i++) {
      yield this.array[i];
    }
  }
}
