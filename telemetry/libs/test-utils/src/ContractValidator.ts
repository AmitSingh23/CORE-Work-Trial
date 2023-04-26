import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import TemperatureSensor from '@app/miner-telemetry-models/telemetry/models/TemperatureSensor';

export default class ContractValidator {
  static validate(response: MinerTelemetry) {
    expect(typeof response.id).toBe('string');
    expect(typeof response.hashrate).toBe('number');
    expect(typeof response.health).toBe('boolean');
    expect(typeof response.pool).toBe('boolean');

    expect(response.fans.length).toBe(4);
    expect(response.temp.length).toBe(4);

    for (let i = 0; i < 4; i++) {
      expect(typeof response.fans[i]).toBe('number');

      expect(typeof response.temp[i].intake).toBe('number');
      expect(typeof response.temp[i].out).toBe('number');
    }
  }

  static validateJSON(response: any) {
    const sensors = [];
    for (const sensor of response._temp) {
      sensors.push(new TemperatureSensor(sensor._intake, sensor._out));
    }

    const minerTelemetry: MinerTelemetry = new MinerTelemetry(
      response._id,
      response._hashrate,
      response._health,
      response._pool,
      sensors,
      response._fans,
    );

    this.validate(minerTelemetry);
  }
}
