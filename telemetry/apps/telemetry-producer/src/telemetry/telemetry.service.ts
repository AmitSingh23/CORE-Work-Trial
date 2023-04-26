import {
  Injectable, InternalServerErrorException, NotFoundException, OnModuleInit, Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelemetryRandomizer from '../telemetry.randomizer/telemetry.randomizer.service';

@Injectable()
export class TelemetryService implements OnModuleInit {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  private minerIds: Set<String> = new Set<String>();

  // simulates loading data when the module is loaded-- in this demo it doesn't matter, but realistically, it would be an API call/cache lookup and
  // something that expensive shouldn't be in the constructor
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
      throw new NotFoundException(`Miner(${id}) was not found`);
    }

    return TelemetryRandomizer.randomize(id);
  }

  // this call simulates talking to the miner orchestrator to get all the miner info
  loadMinerIds() {
    for (const id of this.configService.get<string>('MINERS')?.split(',')) {
      this.minerIds.add(id);
    }
  }
}
