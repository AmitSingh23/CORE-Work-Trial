import TemperatureSensor from './TemperatureSensor';

export default class MinerTelemetry {
  private _id: string;

  private _hashrate: number;

  private _health: boolean;

  private _pool: boolean;

  private _temp: TemperatureSensor[];

  private _fans: number[];

  constructor(
    id: string,
    hashrate: number,
    health: boolean,
    pool: boolean,
    temp: TemperatureSensor[],
    fans: number[],
  ) {
    if (temp.length !== 4) {
      throw new Error('There needs to be 4 temperature sensors');
    }

    if (fans.length !== 4) {
      throw new Error('There needs to be 4 fans');
    }

    this._id = id;
    this._hashrate = hashrate;
    this._health = health;
    this._pool = pool;
    this._temp = temp;
    this._fans = fans;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get hashrate(): number {
    return this._hashrate;
  }

  public set hashrate(value: number) {
    this._hashrate = value;
  }

  public get health(): boolean {
    return this._health;
  }

  public set health(value: boolean) {
    this._health = value;
  }

  public get pool(): boolean {
    return this._pool;
  }

  public set pool(value: boolean) {
    this._pool = value;
  }

  public get temp(): TemperatureSensor[] {
    return this._temp;
  }

  public set temp(value: TemperatureSensor[]) {
    this._temp = value;
  }

  public get fans(): number[] {
    return this._fans;
  }

  public set fans(value: number[]) {
    this._fans = value;
  }
}
