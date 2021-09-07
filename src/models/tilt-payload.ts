export class TiltPayload {
  public rssiLevel: string;

  constructor(
    public uuid: string,
    public temperature: number,
    public gravity: number,
    public rssi: number,
    public timestamp: Date,
    public color: string,
  ) {
    if (rssi >= -90) {
      this.rssiLevel = 'Unstable';
    } else if (rssi >= -80) {
      this.rssiLevel = 'Not Good';
    } else if (rssi >= -70) {
      this.rssiLevel = 'Okay';
    } else if (rssi >= -67) {
      this.rssiLevel = 'Very Good';
    } else if (rssi >= -30) {
      this.rssiLevel = 'Amazing';
    }
  }
}
