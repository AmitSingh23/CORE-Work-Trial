import exp from "constants";
import TelemetryRandomizer from "./telemetry.randomizer.service";


describe('Telemetry Randomizer Service', () => {

  it('.randomize() should return valid MinerTelemetry object with the passed in id', () => {
    let response = TelemetryRandomizer.randomize("id");

    expect(response.id).toBe('id');
  });

  it('.randomize should return valid MinerTelemetry object', () => {
    let response = TelemetryRandomizer.randomize("id");

    console.log("id", response.id);

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
  })
});