import exp from 'constants';
import ContractValidator from '@app/test-utils/ContractValidator';
import TelemetryRandomizer from './telemetry.randomizer.service';

describe('Telemetry Randomizer Service', () => {
  it('.randomize() should return valid MinerTelemetry object with the passed in id', () => {
    const response = TelemetryRandomizer.randomize('id');

    expect(response.id).toBe('id');
  });

  it('.randomize should return valid MinerTelemetry object', () => {
    const response = TelemetryRandomizer.randomize('id');
    ContractValidator.validate(response);
  });
});
