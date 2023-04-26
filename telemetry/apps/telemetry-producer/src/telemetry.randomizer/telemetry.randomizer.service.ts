import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';

export default class TelemetryRandomizer {
  static randomize(id: string) {
    const telemetry = MinerTelemetryFactory.createNominalMinerTelemetry(id);

    for (const temp of telemetry.temp) {
      temp.intake = TelemetryRandomizer.randomNominal(MinerTelemetryFactory.NOMINAL_INTAKE, 0.04);
    }

    for (let i = 0; i < telemetry.fans.length; i++) {
      telemetry.fans[i] = this.randomNominal(MinerTelemetryFactory.NOMINAL_FAN_SPEED, 0.04);
    }

    telemetry.hashrate = this.randomNominal(MinerTelemetryFactory.NOMINAL_HASHRATE, 0.04);
    telemetry.health = this.randomBool(0.9);
    telemetry.pool = this.randomBool(0.9);

    return telemetry;
  }

  private static randomBool(rate: number) {
    return Math.random() <= rate;
  }

  private static randomNominal(nominalValue: number, skew: number): number {
    return TelemetryRandomizer.gaussianRandom(nominalValue, nominalValue * skew);
  }

  private static gaussianRandom(mean: number, stdev: number) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return z * stdev + mean;
  }
}
