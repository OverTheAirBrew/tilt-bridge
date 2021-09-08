import { Service } from 'typedi';
import { IBrewersFriendConfig } from './providers/brewers-friend';
import { IOtaHomebrewConfig } from './providers/overtheair-homebrew';
import { IWebhookConfig } from './providers/webhook';

type ConfigurationType = { type: string } & (
  | IOtaHomebrewConfig
  | IBrewersFriendConfig
  | IWebhookConfig
);

export interface IConfiguration {
  logging: {
    level: string;
  };
  configs?: ConfigurationType[];
}

@Service()
export class ConfigStore {
  private configurations: ConfigurationType[] = [];

  public async setConfig(config: IConfiguration) {
    for (const configuration of config.configs) {
      if (
        !Object.keys(configuration).some(
          (key) => typeof configuration[key] === 'undefined',
        )
      ) {
        this.configurations.push(configuration);
      }
    }
  }

  public async getConfig(provider: string) {
    const config = this.configurations.find(
      (config) => config.type === provider,
    );

    return config;
  }

  public async isEnabled(provider: string) {
    return this.configurations.some((config) => config.type === provider);
  }
}
