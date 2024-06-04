import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as orm from "@midwayjs/typeorm"
import * as redis from '@midwayjs/redis';
import * as swagger from "@midwayjs/swagger"
import * as i18n from '@midwayjs/i18n';
import {ValidateErrorFilter} from "./filter/validate.filter"
import { CommonErrorFilter } from './filter/common.filter';

@Configuration({
  imports: [
    koa,
    orm,
    redis,
    i18n,
    {
      component: swagger,
      enabledEnvironment: ['local']
    },
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([ValidateErrorFilter, CommonErrorFilter])
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
