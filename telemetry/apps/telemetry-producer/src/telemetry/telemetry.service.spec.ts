import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import ContractValidator from '@app/test-utils/ContractValidator';
import { NotFoundException } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

describe('TelemetryService', () => {
  let service: TelemetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryService,
        {
          provide: ConfigService,
          useValue: {
            get: () => '1,2,3',
          },
        },
      ],
    }).compile();

    service = module.get<TelemetryService>(TelemetryService);

    // need to call explicitly because we're not loading the module, just the service
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return valid MinerTelemetry object if miner exists', () => {
    const response = service.getMinerTelemetry('1');

    ContractValidator.validate(response);
  });

  it('should throw a NotFoundException if miner does not exist', () => {
    let response: any;
    try {
      service.getMinerTelemetry('5');
    } catch (error: any) {
      response = error;
    }

    expect(response instanceof NotFoundException).toBe(true);
  });
});
