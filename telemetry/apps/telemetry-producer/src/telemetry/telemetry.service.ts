import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import {
  Get, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit, Query,
} from '@nestjs/common';
import { data } from '../../data/miner.telemetry.seed';
import TelemetryRandomizer from '../telemetry.randomizer/telemetry.randomizer.service';

@Injectable()
export class TelemetryService implements OnModuleInit {
  private telemetryData: Map<String, MinerTelemetry> = new Map<String, MinerTelemetry>();
  private minerIds: Set<String> = new Set<String>();

  onModuleInit() {
    this.loadMinerIds();
  }

  getMinerTelemetry(id: string) {
    let minerExists = false;

    try {
      minerExists = this.minerIds.has(id);
    } catch (e: any) {
      throw new InternalServerErrorException(`An error ocurred while trying to access telemetry data for miner(${id})`);
    }

    if (!minerExists) {
      throw new NotFoundException(`Miner(${id} was not found)`)
    }

    return TelemetryRandomizer.randomize(id);
  }

  // this call simulates talking to the miner orchestrator to get all the miner info 
  loadMinerIds() {
    for (const id of process.env.MINERS.split(",")) {
      this.minerIds.add(id);
    }
  }

}