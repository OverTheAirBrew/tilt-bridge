import { Service } from 'typedi';
import { TiltPayload } from './models/tilt-payload';

@Service()
export class TiltValuesStore {
  private values: TiltPayload;

  public setLatestValues(payload: TiltPayload) {
    this.values = payload;
  }

  get latestValues() {
    return this.values;
  }

  get hasValues() {
    return !!this.values;
  }
}
