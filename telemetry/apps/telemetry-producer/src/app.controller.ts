import ClusterConfig from '@app/miner-telemetry-models/telemetry/models/ClusterConfig';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('config')
  getConfig() {
    return new ClusterConfig(parseInt(process.env.NUM_MINERS), parseInt(process.env.AMBIENT_TEMPERATURE));
  }
}
