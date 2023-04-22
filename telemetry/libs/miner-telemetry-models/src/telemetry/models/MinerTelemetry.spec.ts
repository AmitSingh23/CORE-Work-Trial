import MinerTelemetry from './MinerTelemetry';
import TemperatureSensor from './TemperatureSensor';

describe('Validate Number of Temperature Sensors', () => {
  it('If number of temperature sensors != 4, then validation should fail', () => {
    expect(() => generateMinerTelemetrySansTemp([new TemperatureSensor(1, 2)])).toThrow();
    expect(() => generateMinerTelemetrySansTemp([
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
    ])).toThrow();
  });

  it('If number of temperature sensors == 4, then validations should pass', () => {
    expect(() => generateMinerTelemetrySansTemp([
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
    ])).not.toThrow();
  });
});

describe('Validate Number of fans', () => {
  it('If number of fans != 4, then validation should fail', () => {
    expect(() => generateMinerTelemetrySansFans([1, 2, 3])).toThrow();
    expect(() => generateMinerTelemetrySansFans([])).toThrow();
  });

  it('If number of fans == 4, then validation should pass', () => {
    expect(() => generateMinerTelemetrySansFans([1, 2, 3, 4])).not.toThrow();
  });
});

function generateMinerTelemetrySansTemp(
  temp: TemperatureSensor[],
): MinerTelemetry {
  console.log(temp);
  return new MinerTelemetry('1', 100, true, true, temp, [1, 2, 3, 4]);
}

function generateMinerTelemetrySansFans(fans: number[]): MinerTelemetry {
  return new MinerTelemetry(
    '1',
    100,
    true,
    true,
    [
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
      new TemperatureSensor(1, 2),
    ],
    fans,
  );
}
