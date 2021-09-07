"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.BrewersFriendProvider = void 0;
const typedi_1 = require("typedi");
const provider_1 = require("./provider");
let BrewersFriendProvider = class BrewersFriendProvider extends provider_1.Provider {
    constructor() {
        super('brewers-friend');
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.shouldRun())) {
                this.logger.debug(this.type, 'SKIPPING AS NO CONFIG OR TILT VALUES');
                return;
            }
            const config = yield this.getConfig();
            const latestValues = yield this.getLatestReading();
            const mappedValues = yield this.mapPayload(latestValues);
            yield this.makeRequest(`https://log.brewersfriend.com/stream/${config.apiKey}`, mappedValues);
            this.logger.info('SENT DATA TO OTA HOMEBREW', mappedValues);
        });
    }
    mapPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                device_source: 'tilt-brige',
                gravity: payload.gravity,
                temp: payload.temperature,
                rssi: payload.rssi,
                name: payload.color,
                gravity_unit: 'G',
            };
        });
    }
};
BrewersFriendProvider = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], BrewersFriendProvider);
exports.BrewersFriendProvider = BrewersFriendProvider;
//# sourceMappingURL=brewers-friend.js.map