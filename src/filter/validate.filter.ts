import {Catch} from "@midwayjs/core";
import { MidwayI18nService } from "@midwayjs/i18n";
import { Context } from "@midwayjs/koa";
import { MidwayValidationError } from "@midwayjs/validate";


@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    // 获取国际化服务
    const i18nService = await ctx.requestContext.getAsync(MidwayI18nService);

    const message = i18nService.translate(err.message) || err.message

    ctx.status = 422

    return {
      code: 422,
      message
    }
  }
}
