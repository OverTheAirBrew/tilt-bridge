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
exports.Provider = void 0;
const node_logging_1 = require("@overtheairbrew/node-logging");
const axios_1 = require("axios");
const typedi_1 = require("typedi");
const provider_config_1 = require("../provider-config");
const tilt_values_store_1 = require("../tilt-values-store");
class Provider {
    constructor(type) {
        this.type = type;
        this.tiltStore = typedi_1.default.get(tilt_values_store_1.TiltValuesStore);
        this.configStore = typedi_1.default.get(provider_config_1.ConfigStore);
        this.logger = typedi_1.default.get(node_logging_1.Logger);
    }
    shouldRun() {
        return __awaiter(this, void 0, void 0, function* () {
            const configEnabled = yield this.configStore.isEnabled(this.type);
            const hasValues = this.tiltStore.hasValues;
            if (configEnabled && hasValues) {
                return true;
            }
            return false;
        });
    }
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.configStore.getConfig(this.type);
            return config;
        });
    }
    getLatestReading() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tiltStore.latestValues;
        });
    }
    makeRequest(url, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.post(url, payload, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            }
            catch (err) {
                const error = err;
                this.logger.error(error);
            }
        });
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map