import MinerTelemetry from '@app/miner-telemetry-models/telemetry/models/MinerTelemetry';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TelemetryProducerClient {

    producerHost = "http://localhost:3000"

    @Inject()
    httpService: HttpService

    async getTelemetry(id: string): Promise<MinerTelemetry> {
        const { data } = await firstValueFrom(this.httpService.get<MinerTelemetry>(`${this.producerHost}/telemetry/${id}`).pipe(
            catchError((error: any, caught: Observable<any>) => {
                throw error;
            }))
        );
            
        return data;
    }
}
