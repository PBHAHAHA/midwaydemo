import {  Provide } from '@midwayjs/core';
// import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Course } from '../entity/Course';
import { FindOptionsWhere, Repository } from 'typeorm';
// import { BaseService } from '../common/base.service';
// import { MidwayValidationError } from '@midwayjs/validate';
import { CommonError } from '../common/common.error';
// import { CommonError } from '../common/common.error';

@Provide()
export class CourseService {
  @InjectEntityModel(Course)
  courseModel: Repository<Course>;

  getModel(): Repository<Course> {
    return this.courseModel;
  }

  async create(entity: Course) {
    let user = await this.getModel()
      .createQueryBuilder('model')
      .where('model.name = :name', { name: entity.name })
      .getOne();
    if (user) {
      throw new CommonError('已存在');
    }
    return await this.getModel().save(entity);
  }

  async edit(entity): Promise<void> {
    return await this.getModel().save(entity);
  }

  async remove(entity: Course) {
    await this.getModel().remove(entity);
  }

  async getById(id: number): Promise<Course> {
    return await this.getModel()
      .createQueryBuilder('model')
      .where('model.id = :id', { id })
      .getOne();
  }

  async page(page: number, pageSize: number, where?: FindOptionsWhere<Course>) {
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

  async list(where?: FindOptionsWhere<Course>) {
    const order: any = { create_time: 'desc' };
    const data = await this.getModel().find({
      where,
      order,
    });

    return data;
  }

}
