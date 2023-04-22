export default class ClusterConfig {
  maxNumberMiners: number;

  ambientTemperature: number;

  constructor(maxNumberMiners: number, ambientTemperature: number) {
    this.maxNumberMiners = maxNumberMiners;
    this.ambientTemperature = ambientTemperature;
  }
}
