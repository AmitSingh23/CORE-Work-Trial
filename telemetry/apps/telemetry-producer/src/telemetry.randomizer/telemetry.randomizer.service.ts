import MinerTelemetry from "@app/miner-telemetry-models/telemetry/models/MinerTelemetry";

export default class TelemetryRandomizer {
  static readonly NOMINAL_INTAKE = 72;
  static readonly NOMINAL_OUT = 92;
  static readonly NOMINAL_FAN_SPEED = 7200;

  static randomize(telemetry: MinerTelemetry) {
    for (const temp of telemetry.temp) {
      temp.intake = TelemetryRandomizer.randomNominal(this.NOMINAL_INTAKE, 0.04).toPrecision(3);
    }

    for (let i = 0; i < telemetry.fans.length; i++) {
      telemetry.fans[i] = this.randomNominal(this.NOMINAL_FAN_SPEED, 0.04).toPrecision(4);
    }

    return telemetry;    
  }

  private static randomNominal(nominalValue: number, skew: number): number {
    return TelemetryRandomizer.gaussianRandom(nominalValue, nominalValue * skew);
  }
  
  private static gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random(); // Converting [0,1) to (0,1]
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}
}
