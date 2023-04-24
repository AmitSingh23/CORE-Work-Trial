import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import MinerTelemetryFactory from '@app/miner-telemetry-models/telemetry/models/MinerTelemetryFactory';
import ContractValidator from '@app/test-utils/ContractValidator';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';


describe('TelemetryController', () => {
  let controller: TelemetryController;
  let telemetryService: DeepMocked<TelemetryService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryController],
      providers: [
        { 
          provide: TelemetryService,
          useValue: createMock<TelemetryService>()
        }
      ]
    }).compile();

    controller = module.get<TelemetryController>(TelemetryController);
    telemetryService = module.get(TelemetryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get valid request and return valid MinerTelemetry response', () => {
    telemetryService.getMinerTelemetry.mockReturnValue(MinerTelemetryFactory.createNominalMinerTelemetry('1'));
    let response = controller.getTelemetry('1');

    ContractValidator.validate(response);

    expect(telemetryService.getMinerTelemetry).toHaveBeenCalledTimes(1);
    expect(telemetryService.getMinerTelemetry).toHaveBeenCalledWith('1')
  });

  it('should return a 404 when miner not found', () => {
    telemetryService.getMinerTelemetry.mockImplementation(() => {
      throw new NotFoundException("fake-error");
    })

    let response: any;
    try {
      controller.getTelemetry('1');
    } catch (error: any) {
      response = error;
    }

    expect(response.status).toBe(404);
  });

  it('should return a 500 when backend error occurs', () => {
    telemetryService.getMinerTelemetry.mockImplementation(() => {
      throw new InternalServerErrorException("fake-error");
    })

    let response: any;
    try {
      controller.getTelemetry('1');
    } catch (error: any) {
      response = error;
    }

    expect(response.status).toBe(500);
  });

});
