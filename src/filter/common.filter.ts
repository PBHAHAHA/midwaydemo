
import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CommonError } from '../common/common.error';

@Catch(CommonError)
export class CommonErrorFilter {
  async catch(err: CommonError, ctx: Context) {
    const message =  err.message;
    ctx.status = 200;
    return {
      code: 200,
      success: false,
      message,
    };
  }
}
