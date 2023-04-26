import MinerTelemetry from './MinerTelemetry';
import TemperatureSensor from './TemperatureSensor';

export default class MinerTelemetryFactory {
  static readonly NOMINAL_INTAKE = 72;

  static readonly NOMINAL_OUT = 92;

  static readonly NOMINAL_FAN_SPEED = 7_200;

  static readonly NOMINAL_HASHRATE = 10_000;

  static createNominalMinerTelemetry(id: string): MinerTelemetry {
    return new MinerTelemetry(
      id,
      this.NOMINAL_HASHRATE,
      true,
      true,
      [
        new TemperatureSensor(this.NOMINAL_INTAKE, this.NOMINAL_OUT),
        new TemperatureSensor(this.NOMINAL_INTAKE, this.NOMINAL_OUT),
        new TemperatureSensor(this.NOMINAL_INTAKE, this.NOMINAL_OUT),
        new TemperatureSensor(this.NOMINAL_INTAKE, this.NOMINAL_OUT),
      ],
      [
        this.NOMINAL_FAN_SPEED,
        this.NOMINAL_FAN_SPEED,
        this.NOMINAL_FAN_SPEED,
        this.NOMINAL_FAN_SPEED,
      ],
    );
  }
}
