import { ApiProperty } from "@midwayjs/swagger";
import { Rule, RuleType } from "@midwayjs/validate";

export class UserDto {
  @ApiProperty({
    description: "id"
  })
  @Rule(RuleType.number().required().error(new Error("不能为空")))
  id: number


  @ApiProperty({
    description: "课程名称"
  })
  @Rule(RuleType.string().required().error(new Error("课程名称不能为空")))
  name: string

  @ApiProperty({
    description: "课程描述"
  })
  @Rule(RuleType.string())
  description: string

  @ApiProperty({
    description: "课程价格"
  })
  @Rule(RuleType.number().required().error(new Error("课程价格不能为空")))
  price: number

  @ApiProperty({
    description: "课程时长"
  })
  @Rule(RuleType.number().required().error(new Error("课程时长不能为空")))
  duration: number



}
