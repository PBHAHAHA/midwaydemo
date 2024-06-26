// src/common/base.service.ts
import { Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseService<T extends BaseEntity> {
  @Inject()
  ctx: Context;

  abstract getModel(): Repository<T>;

  async create(entity: T) {
    return await this.getModel().save(entity);
  }

  async edit(entity: T): Promise<T | void> {
    return await this.getModel().save(entity);
  }

  async remove(entity: T) {
    await this.getModel().remove(entity);
  }

  async getById(id: number): Promise<T> {
    return await this.getModel()
      .createQueryBuilder('model')
      .where('model.id = :id', { id })
      .getOne();
  }

  async page(page: number, pageSize: number, where?: FindOptionsWhere<T>) {
    console.log(page, pageSize, Number)
    const order: any = { create_time: 'desc' };

    const [data, total] = await this.getModel().findAndCount({
      where,
      order,
      skip: ((page-1) * pageSize),
      take: pageSize,
    });

    return { data, total };
  }

  async list(where?: FindOptionsWhere<T>) {
    const order: any = { create_time: 'desc' };
    const data = await this.getModel().find({
      where,
      order,
    });

    return data;
  }
}
