export default class TemperatureSensor {
  private _intake: number;

  private _out: number;

  constructor(intake: number, out: number) {
    this._intake = intake;
    this._out = out;
  }

  public get intake(): number {
    return this._intake;
  }

  public set intake(intake: number) {
    this._intake = intake;
  }

  public get out(): number {
    return this._out;
  }

  public set out(out: number) {
    this._out = out;
  }
}
