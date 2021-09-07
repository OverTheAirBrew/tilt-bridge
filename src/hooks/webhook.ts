import { Cron, CronController } from 'cron-typedi-decorators';
import { Service } from 'typedi';
import { WebhookProvider } from '../providers/webhook';

@CronController('webhook')
@Service()
export class WebhookHook {
  constructor(private provider: WebhookProvider) {}

  @Cron('webhook-send-data', '*/5 * * * * *')
  async sendData() {
    await this.provider.run();
  }
}
