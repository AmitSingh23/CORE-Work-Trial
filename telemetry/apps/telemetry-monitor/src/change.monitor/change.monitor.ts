import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import ArrayUtils from '../util/ArrayUtils';

export default class ChangeMonitor {
  static significantChange(values: number[], currentValue: number, threshold: number) {
    const average = ArrayUtils.average(values);
    const lowerBound = average * (1 - threshold);
    const upperBound = average * (1 + threshold);

    if (currentValue <= lowerBound) {
      return -1;
    } if (currentValue >= upperBound) {
      return 1;
    }

    return 0;
  }

  static outOfSpec(currentValue: number, nominalValue: number, skew: number) {
    const lowerThreshold = nominalValue * (1 - skew);
    const upperThreshold = nominalValue * (1 + skew);

    if (currentValue <= lowerThreshold) {
      return -1;
    } if (currentValue >= upperThreshold) {
      return 1;
    }

    return 0;
  }

  static notUp(currentValue: boolean) {
    return !currentValue;
  }
}
