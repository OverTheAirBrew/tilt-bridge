import { Cron, CronController } from 'cron-typedi-decorators';
import { Service } from 'typedi';
import { BrewersFriendProvider } from '../providers/brewers-friend';

@CronController('brewers-friend')
@Service()
export class BrewersFriendHook {
  constructor(private provider: BrewersFriendProvider) {}

  @Cron('send-data', '*/5 * * * *')
  async sendData() {
    await this.provider.run();
  }
}
