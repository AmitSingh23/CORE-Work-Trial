import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import {
  Get, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit,
} from '@nestjs/common';
import { data } from '../../data/miner.telemetry.seed';
import TelemetryRandomizer from '../telemetry.randomizer/telemetry.randomizer.service';

@Injectable()
export class TelemetryService implements OnModuleInit {
  private telemetryData: Map<String, MinerTelemetry> = new Map<String, MinerTelemetry>();

  onModuleInit() {
    console.log("yurr")
    this.loadMinerTelemetry(data);
  }

  getMinerTelemetry(id: string) {
    let miner: MinerTelemetry;

    try {
      miner = this.telemetryData.get(id);
    } catch (e: any) {
      throw new InternalServerErrorException(`An error ocurred while trying to access telemetry data for miner(${id})`);
    }

    if (!miner) {
      throw new NotFoundException(`Miner(${id}) does not exist`);
    }

    return TelemetryRandomizer.randomize(miner);;
  }

  loadMinerTelemetry(data: MinerTelemetry[]) {
    for (const miner of data) {
      this.telemetryData.set(miner.id, miner);
    }
  }
}