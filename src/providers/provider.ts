import { Logger } from '@overtheairbrew/node-logging';
import axios, { AxiosError } from 'axios';
import Container from 'typedi';
import { ConfigStore } from '../provider-config';
import { TiltValuesStore } from '../tilt-values-store';

export abstract class Provider<T> {
  private tiltStore: TiltValuesStore;
  private configStore: ConfigStore;
  protected logger: Logger;

  constructor(public type: string) {
    this.tiltStore = Container.get(TiltValuesStore);
    this.configStore = Container.get(ConfigStore);
    this.logger = Container.get(Logger);
  }

  protected async shouldRun() {
    const configEnabled = await this.configStore.isEnabled(this.type);
    const hasValues = this.tiltStore.hasValues;

    if (configEnabled && hasValues) {
      return true;
    }

    return false;
  }

  protected async getConfig() {
    const config = await this.configStore.getConfig(this.type);
    return config as any as T;
  }

  protected async getLatestReading() {
    return this.tiltStore.latestValues;
  }

  protected async makeRequest<T>(url: string, payload: T) {
    try {
      await axios.post(url, payload, {
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (err) {
      const error = err as AxiosError;
      this.logger.error(error);
    }
  }
}
