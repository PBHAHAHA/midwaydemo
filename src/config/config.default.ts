import { MidwayConfig } from '@midwayjs/core';
// import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1717466698439_4710',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username:'root',
        password: '123456',
        database: 'test',
        synchronize: true,
        logging: true,
        entities: [
          '../entity/*.ts'
        ],
      }
    }
  },
  redis: {
    client: {
      port: 6379,
      host: 'localhost',
      password: '123456',
      db: 0
    }
  },
  i18n: {
    localeTable: {
      en_US: require("../locales/en_US"),
      zh_CN: require('../locales/zh_CN'),
    }
  }
} as MidwayConfig;
