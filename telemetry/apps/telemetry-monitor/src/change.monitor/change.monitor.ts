export default class ChangeMonitor {
  static significantChange(values: number[], currentValue: number, threshold: number) {
    const average = currentValue;
    const lowerBound = average * (1 - threshold);
    const upperBound = average * (1 + threshold);

    if (currentValue <= lowerBound) {
      return -1;
    } if (currentValue >= upperBound) {
      return 1;
    }

    return 0;
  }

  static outOfSpec(currentValue: number, upperThreshold: number, lowerThreshold: number) {
    if (currentValue <= lowerThreshold) {
      return -1;
    } if (currentValue >= upperThreshold) {
      return 1;
    }

    return 0;
  }

  static notUp(currentValue: boolean) {
    return currentValue;
  }
}
