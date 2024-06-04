import {  Body, Controller, Del, Get, Inject, Param, Post, Query } from "@midwayjs/core";
// ALL
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user";
import { Validate } from "@midwayjs/validate";
import { User } from "../entity/User";

@Controller("/user")
export class UserController {
  @Inject()
  userService: UserService;

  @Post("/")
  @Validate()
  async create(@Body() data: UserDto) {
    const user = new User()
    user.name = data.name
    user.age = data.age

    return this.userService.create(user)
  }

  @Del("/:id")
  async remove(@Param('id') id: number) {
    const user = await this.userService.getById(id)
    await this.userService.remove(user)
  }


  @Get("/page")
  async page(@Query('page') page: number, @Query('size') size: number) {
    return await this.userService.page(page, size)
  }
}
