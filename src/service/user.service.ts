import { Provide } from '@midwayjs/core';
// import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/User';
import {  Repository } from 'typeorm';
import { BaseService } from '../common/base.service';

@Provide()
export class UserService extends BaseService<User>{
  @InjectEntityModel(User)
  userModel: Repository<User>;

  getModel(): Repository<User> {
      return this.userModel
  }

}
