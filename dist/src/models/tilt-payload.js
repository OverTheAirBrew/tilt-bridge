"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltPayload = void 0;
class TiltPayload {
    constructor(uuid, temperature, gravity, rssi, timestamp, color) {
        this.uuid = uuid;
        this.temperature = temperature;
        this.gravity = gravity;
        this.rssi = rssi;
        this.timestamp = timestamp;
        this.color = color;
        if (rssi >= -90) {
            this.rssiLevel = 'Unstable';
        }
        else if (rssi >= -80) {
            this.rssiLevel = 'Not Good';
        }
        else if (rssi >= -70) {
            this.rssiLevel = 'Okay';
        }
        else if (rssi >= -67) {
            this.rssiLevel = 'Very Good';
        }
        else if (rssi >= -30) {
            this.rssiLevel = 'Amazing';
        }
    }
}
exports.TiltPayload = TiltPayload;
//# sourceMappingURL=tilt-payload.js.map