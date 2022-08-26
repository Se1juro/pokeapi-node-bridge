import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { UserService } from "../services/users.service";
import { CreateUserValidator } from "../validators/users.validator";

@JsonController("/api/users")
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post("/")
  post(@Body() user: CreateUserValidator) {
    return this.userService.createUser(user);
  }
}
