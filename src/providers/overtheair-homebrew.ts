import { Service } from 'typedi';
import { Provider } from './provider';

export interface IOtaHomebrewConfig {
  type: 'ota-homebrew';
  url: string;
}

@Service()
export class OvertheairHomebrew extends Provider<IOtaHomebrewConfig> {
  constructor() {
    super('ota-homebrew');
  }

  public async run() {
    if (!(await this.shouldRun())) {
      this.logger.debug(this.type, 'SKIPPING AS NO CONFIG OR TILT VALUES');
      return;
    }

    const config = await this.getConfig();
    const latestValues = await this.getLatestReading();

    await this.makeRequest(
      `${config.url}/server/webhook/tilt-bridge`,
      latestValues,
    );

    this.logger.info('SENT DATA TO OTA HOMEBREW');
  }
}
