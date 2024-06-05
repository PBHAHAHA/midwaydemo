import {  Provide } from '@midwayjs/core';
// import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
// import { MidwayValidationError } from '@midwayjs/validate';
import { CommonError } from '../common/common.error';
// import { CommonError } from '../common/common.error';

@Provide()
export class UserService extends BaseService<User> {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  getModel(): Repository<User> {
    return this.userModel;
  }

  async create(entity: User) {
    let user = await this.getModel()
      .createQueryBuilder('model')
      .where('model.name = :name', { name: entity.name })
      .getOne();
    console.log(user);
    if (user) {
      throw new CommonError('用户已存在');
    }
    return await this.getModel().save(entity);
  }
}
