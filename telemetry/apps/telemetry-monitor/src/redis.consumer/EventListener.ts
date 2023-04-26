import { Injectable, Logger } from '@nestjs/common';
import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import TemperatureSensor from '@app/miner-telemetry-models/telemetry/models/TemperatureSensor';
import { ConfigService } from '@nestjs/config';
import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import IRedisConsumerEventListener from './RedisConsumerEventListener';
import RedisRecord from './RedisRecord';
import FixedSizeQueue from '../util/FixedQueue';
import ChangeMonitor from '../change.monitor/change.monitor';

@Injectable()
export default class DefaultRedisConsumerEventListener implements IRedisConsumerEventListener {
  private minerTelemetryRecord: Record<string, FixedSizeQueue<MinerTelemetry>>;

  constructor(configService: ConfigService) {
    this.minerTelemetryRecord = {};

    for (const minerId of configService.getOrThrow<string>('MINERS').split(',')) {
      this.minerTelemetryRecord[minerId] = new FixedSizeQueue<MinerTelemetry>(60);
    }
  }

  listen(message: RedisRecord): void {
    // Logger.log(`Received entry ${message.id} from stream ${message.stream}:`, message.payload);

    const minerId = message.payload._id;

    const newRecord = new MinerTelemetry(
      minerId,
      message.payload._hashrate,
      message.payload._health,
      message.payload._pool,
      message.payload._temp.map((value) => new TemperatureSensor(value._intake, value._out)),
      message.payload._fans,
    );

    this.minerTelemetryRecord[minerId].push(newRecord);

    // these should be abstracted and support callbacks
    if (ChangeMonitor.notUp(newRecord.health)) {
      Logger.error(`Miner(${minerId}) health down`);
    }

    if (ChangeMonitor.notUp(newRecord.pool)) {
      Logger.error(`Miner(${minerId}) pool down`);
    }

    const hashRates: number[] = [];
    const fanSpeeds = [];
    const intakeTemps = [];
    const outTemps = [];

    for (let i = 0; i < newRecord.fans.length; i++) {
      fanSpeeds[i] = [];
    }

    for (let i = 0; i < newRecord.temp.length; i++) {
      intakeTemps[i] = [];
      outTemps[i] = [];
    }

    for (const miner of this.minerTelemetryRecord[minerId]) {
      hashRates.push(miner.hashrate);

      for (let i = 0; i < newRecord.fans.length; i++) {
        fanSpeeds[i].push(newRecord.fans[i]);
      }

      for (let i = 0; i < newRecord.temp.length; i++) {
        intakeTemps[i].push(newRecord.temp[i].intake);
        outTemps[i].push(newRecord.temp[i].out);
      }
    }

    if (ChangeMonitor.significantChange(hashRates, newRecord.hashrate, 0.1) != 0) {
      Logger.error(`Miner(${minerId}) hashrate of ${newRecord.hashrate} has significantly deviated from average over the last minute`);
    }

    if (ChangeMonitor.outOfSpec(newRecord.hashrate, MinerTelemetryFactory.NOMINAL_HASHRATE, 0.1)) {
      Logger.error(`Miner(${minerId}) hashrate of ${newRecord.hashrate} has is out of spec`);
    }

    for (let i = 0; i < fanSpeeds.length; i++) {
      if (ChangeMonitor.significantChange(fanSpeeds[i], newRecord.fans[i], 0.1) != 0) {
        Logger.error(`Miner(${minerId}) fan speed ${i + 1} of ${newRecord.fans[i]} has significantly deviated from average over the last minute`);
      }

      if (ChangeMonitor.outOfSpec(newRecord.fans[i], MinerTelemetryFactory.NOMINAL_FAN_SPEED, 0.1) != 0) {
        Logger.error(`Miner(${minerId}) fan speed ${i + 1} of ${newRecord.fans[i]} is out of spec`);
      }
    }

    for (let i = 0; i < intakeTemps.length; i++) {
      if (ChangeMonitor.significantChange(intakeTemps[i], newRecord.temp[i].intake, 0.1) != 0) {
        Logger.error(`Miner(${minerId}) intake temp ${i + 1} of ${newRecord.fans[i]} has significantly deviated from average over the last minute`);
      }

      if (ChangeMonitor.outOfSpec(newRecord.temp[i].intake, MinerTelemetryFactory.NOMINAL_INTAKE, 0.1) != 0) {
        Logger.error(`Miner(${minerId}) intake temp ${i + 1} of ${newRecord.temp[i].intake} is out of spec`);
      }

      if (ChangeMonitor.significantChange(outTemps[i], newRecord.temp[i].out, 0.1) != 0) {
        Logger.error(`Miner(${minerId}) out temp ${i + 1} of ${newRecord.temp[i].out} has significantly deviated from average over the last minute`);
      }

      if (ChangeMonitor.outOfSpec(newRecord.temp[i].out, MinerTelemetryFactory.NOMINAL_OUT, 0.1) != 0) {
        Logger.error(`Miner(${minerId}) out temp ${i + 1} of ${newRecord.temp[i].out} is out of spec`);
      }
    }
  }
}
