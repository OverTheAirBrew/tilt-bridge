"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltBridge = void 0;
const node_logging_1 = require("@overtheairbrew/node-logging");
const bleacon = require("bleacon-fork");
const cron_typedi_decorators_1 = require("cron-typedi-decorators");
const path_1 = require("path");
require("reflect-metadata");
const typedi_1 = require("typedi");
const tilt_payload_1 = require("./models/tilt-payload");
const provider_config_1 = require("./provider-config");
const tilt_values_store_1 = require("./tilt-values-store");
class TiltBridge {
    constructor(configuration) {
        this.hooksPath = (0, path_1.join)(__dirname, 'hooks', '**', '*.js');
        this.TILTS = {
            a495bb10c5b14b44b5121370f02d74de: 'Red',
            a495bb20c5b14b44b5121370f02d74de: 'Green',
            a495bb30c5b14b44b5121370f02d74de: 'Black',
            a495bb40c5b14b44b5121370f02d74de: 'Purple',
            a495bb50c5b14b44b5121370f02d74de: 'Orange',
            a495bb60c5b14b44b5121370f02d74de: 'Blue',
            a495bb70c5b14b44b5121370f02d74de: 'Pink',
        };
        const logger = new node_logging_1.Logger({
            node_env: undefined,
            serviceName: 'tilt-bridge',
            level: configuration.logging.level,
        });
        typedi_1.default.set(node_logging_1.Logger, logger);
        (0, cron_typedi_decorators_1.useContainer)(typedi_1.default);
        const startup = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            (0, cron_typedi_decorators_1.registerController)([this.hooksPath]);
            const valuesStore = typedi_1.default.get(tilt_values_store_1.TiltValuesStore);
            const configStore = typedi_1.default.get(provider_config_1.ConfigStore);
            yield configStore.setConfig(configuration);
            bleacon.on('discover', (bleacon) => {
                if (this.TILTS[bleacon.uuid] !== null) {
                    const payload = new tilt_payload_1.TiltPayload(bleacon.uuid, bleacon.major, bleacon.minor / 1000, bleacon.rssi, new Date(), this.TILTS[bleacon.uuid]);
                    valuesStore.setLatestValues(payload);
                }
            });
            resolve(undefined);
        }));
        startup.then(() => {
            logger.info('STARTING SCANNING');
            bleacon.startScanning();
        });
    }
}
exports.TiltBridge = TiltBridge;
//# sourceMappingURL=application.js.map