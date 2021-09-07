import { Cron, CronController } from 'cron-typedi-decorators';
import { Service } from 'typedi';
import { OvertheairHomebrew } from '../providers/overtheair-homebrew';

@CronController('ota-homebrew')
@Service()
export class OtaHomebrewHook {
  constructor(private provider: OvertheairHomebrew) {}

  @Cron('ota-homebrew-send-data', '* * * * * *')
  async sendData() {
    await this.provider.run();
  }
}
