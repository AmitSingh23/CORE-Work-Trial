export default class ArrayUtils {
  static average(arr: number[]): number {
    if (arr.length === 0) {
      return 0;
    }

    return arr.reduce((prev, curr) => prev + curr) / arr.length;
  }
}
