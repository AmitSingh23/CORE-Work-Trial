import exp from "constants";
import TelemetryRandomizer from "./telemetry.randomizer.service";
import ContractValidator from "@app/test-utils/ContractValidator";


describe('Telemetry Randomizer Service', () => {

  it('.randomize() should return valid MinerTelemetry object with the passed in id', () => {
    let response = TelemetryRandomizer.randomize("id");

    expect(response.id).toBe('id');
  });

  it('.randomize should return valid MinerTelemetry object', () => {
    let response = TelemetryRandomizer.randomize("id");
    ContractValidator.validate(response);
  })
});