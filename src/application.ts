import { Logger, LogLevel } from '@overtheairbrew/node-logging';
import * as bleacon from 'bleacon-fork';
import {
  registerController,
  useContainer as cronUseContainer,
} from 'cron-typedi-decorators';
import { join } from 'path';
import 'reflect-metadata';
import Container from 'typedi';
import { TiltPayload } from './models/tilt-payload';
import { ConfigStore, IConfiguration } from './provider-config';
import { TiltValuesStore } from './tilt-values-store';

interface IBleacon {
  uuid: string;
  major: number;
  minor: number;
  rssi: number;
}

export class TiltBridge {
  private readonly hooksPath: string = join(__dirname, 'hooks', '**', '*.js');

  private readonly TILTS = {
    a495bb10c5b14b44b5121370f02d74de: 'Red',
    a495bb20c5b14b44b5121370f02d74de: 'Green',
    a495bb30c5b14b44b5121370f02d74de: 'Black',
    a495bb40c5b14b44b5121370f02d74de: 'Purple',
    a495bb50c5b14b44b5121370f02d74de: 'Orange',
    a495bb60c5b14b44b5121370f02d74de: 'Blue',
    a495bb70c5b14b44b5121370f02d74de: 'Pink',
  };

  constructor(configuration: IConfiguration) {
    const logger = new Logger({
      node_env: undefined,
      serviceName: 'tilt-bridge',
      level: configuration.logging.level as LogLevel,
    });

    Container.set(Logger, logger);

    cronUseContainer(Container);

    const startup = new Promise(async (resolve) => {
      registerController([this.hooksPath]);

      const valuesStore = Container.get(TiltValuesStore);
      const configStore = Container.get(ConfigStore);

      await configStore.setConfig(configuration);

      bleacon.on('discover', (bleacon: IBleacon) => {
        if (this.TILTS[bleacon.uuid] !== null) {
          const payload = new TiltPayload(
            bleacon.uuid,
            bleacon.major,
            bleacon.minor / 1000,
            bleacon.rssi,
            new Date(),
            this.TILTS[bleacon.uuid],
          );

          valuesStore.setLatestValues(payload);
        }
      });

      resolve(undefined);
    });

    startup.then(() => {
      logger.info('STARTING SCANNING');
      bleacon.startScanning();
    });
  }
}
