import { Service } from 'typedi';
import { Provider } from './provider';

export interface IWebhookConfig {
  type: 'webhook';
  urls: string;
}

@Service()
export class WebhookProvider extends Provider<IWebhookConfig> {
  constructor() {
    super('webhook');
  }

  public async run() {
    if (!(await this.shouldRun())) {
      this.logger.debug(this.type, 'SKIPPING AS NO CONFIG OR TILT VALUES');
      return;
    }

    const config = await this.getConfig();
    const latestValues = await this.getLatestReading();

    const splitUrls = config.urls.split(',');

    await Promise.all(
      splitUrls.map(async (url) => {
        await this.makeRequest(url, latestValues);
        this.logger.info(`SENT DATA TO ${url}`, latestValues);
      }),
    );
  }
}
