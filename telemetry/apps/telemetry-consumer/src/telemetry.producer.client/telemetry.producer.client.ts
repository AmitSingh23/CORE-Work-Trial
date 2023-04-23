import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TelemetryProducerClient {
    private readonly httpService: HttpService

    private readonly producerHost: string;

    constructor(httpService: HttpService, configService: ConfigService) {
        this.httpService = httpService;

        this.producerHost = configService.get<string>('PRODUCER_HOST');
    }

    async getTelemetry(id: string): Promise<MinerTelemetry> {
        let telemetry: MinerTelemetry;

        let response = await firstValueFrom(this.httpService.get(`${this.producerHost}/telemetry/${id}`))
        
        telemetry = new MinerTelemetry(
            response.data._id,
            response.data._hashrate, 
            response.data._health,
            response.data._pool,
            response.data._temp,
            response.data._fans
        )
            
        return telemetry;
    }
}
