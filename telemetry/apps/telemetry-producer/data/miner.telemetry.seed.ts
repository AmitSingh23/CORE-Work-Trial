import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import TemperatureSensor from '@app/miner-telemetry-models/telemetry/models/TemperatureSensor';

export const data = [
  new MinerTelemetry("123", 1000, true, true, [new TemperatureSensor(72, 72), new TemperatureSensor(73, 72), new TemperatureSensor(72, 72), new TemperatureSensor(77, 72)], [7300, 7200, 7200, 7200]),
  new MinerTelemetry("234", 1000, true, true, [new TemperatureSensor(72, 72), new TemperatureSensor(76, 76), new TemperatureSensor(72, 72), new TemperatureSensor(77, 72)], [7400, 7200, 7200, 7200]),
  new MinerTelemetry("345", 1000, true, true, [new TemperatureSensor(72, 72), new TemperatureSensor(72, 73), new TemperatureSensor(72, 72), new TemperatureSensor(82, 92)], [9200, 7200, 7200, 7200]),
  new MinerTelemetry("456", 1000, true, true, [new TemperatureSensor(72, 72), new TemperatureSensor(78, 78), new TemperatureSensor(72, 72), new TemperatureSensor(82, 92)], [10200, 7200, 7200, 7200]),
];
