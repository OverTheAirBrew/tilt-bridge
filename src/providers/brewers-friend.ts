import { Service } from 'typedi';
import { TiltPayload } from '../models/tilt-payload';
import { Provider } from './provider';

export interface IBrewersFriendConfig {
  type: 'brewers-friend';
  apiKey: string;
}

@Service()
export class BrewersFriendProvider extends Provider<IBrewersFriendConfig> {
  constructor() {
    super('brewers-friend');
  }

  public async run() {
    if (!(await this.shouldRun())) {
      this.logger.debug(this.type, 'SKIPPING AS NO CONFIG OR TILT VALUES');
      return;
    }

    const config = await this.getConfig();

    const latestValues = await this.getLatestReading();
    const mappedValues = await this.mapPayload(latestValues);

    await this.makeRequest(
      `https://log.brewersfriend.com/stream/${config.apiKey}`,
      mappedValues,
    );

    this.logger.info('SENT DATA TO OTA HOMEBREW', mappedValues);
  }

  private async mapPayload(payload: TiltPayload) {
    return {
      device_source: 'tilt-brige',
      gravity: payload.gravity,
      temp: payload.temperature,
      rssi: payload.rssi,
      name: payload.color,
      gravity_unit: 'G',
    };
  }
}
