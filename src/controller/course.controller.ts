import {  Body, Controller, Del, Get, Inject, Param, Post, Query } from "@midwayjs/core";
// ALL
import { UserDto } from "../dto/course";
import { Validate } from "@midwayjs/validate";
import { Course } from "../entity/Course";
// import { MoreThan } from "typeorm";
import { CourseService } from "../service/course.service";

@Controller("/course")
export class CourseController {
  @Inject()
  courseService: CourseService;

  @Post("/")
  @Validate()
  async create(@Body() data: UserDto) {
    const course = new Course()
    course.name = data.name
    course.description = data.description
    course.price = data.price
    course.duration = data.duration

    return this.courseService.create(course)
  }

  @Del("/:id")
  async remove(@Param('id') id: number) {
    const user = await this.courseService.getById(id)
    await this.courseService.remove(user)
  }


  @Get("/page")
  async page(@Query('page') page: number, @Query('size') size: number) {
    return await this.courseService.page(page, size)
  }
}
