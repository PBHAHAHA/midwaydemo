import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { RedisService } from '@midwayjs/redis';
import { MidwayI18nService } from '@midwayjs/i18n';
import { UserDto } from '../dto/user';
import { CommonError } from '../common/common.error';

@Controller('/')
export class HomeController {

  @InjectEntityModel(User)
  userModel: Repository<User>

  @Inject()
  redisService: RedisService

  @Inject()
  i18nService: MidwayI18nService

  @Get('/')
  async home(): Promise<string> {

    return await this.i18nService.translate('hello', {
      locale: 'zh_CN'
    })

    // 设置值
    // await this.redisService.set('foo', 'bar');
    // 获取值
    return await this.redisService.get('foo');

    // console.log("123")
    // return await this.userModel.find();
  }

  @Post("/")
  async home2(@Body() user: UserDto): Promise<string> {
    console.log(user)
    if(user.id == 1) {
      throw new CommonError("嘻嘻嘻嘻嘻")
    }
    return user.id + "--" + user.age
  }
}
