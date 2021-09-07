import { TiltBridge } from '../src/application';

new TiltBridge({
  logging: {
    level: process.env.LOG_LEVEL || 'error',
  },
  database: {
    path: process.env.DATABASE_PATH || __dirname,
  },
  configs: [
    {
      type: 'ota-homebrew',
      url: process.env.OTA_HOMEBREW_BASE_URL,
    },
    {
      type: 'brewers-friend',
      apiKey: process.env.BREWERS_FRIEND_API_KEY,
    },
    {
      type: 'webhook',
      urls: process.env.WEBHOOK_URLS,
    },
  ],
});
