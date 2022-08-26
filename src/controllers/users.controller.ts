import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { ObjectID } from "typeorm";
import { UserService } from "../services/users.service";
import { CreateUserValidator } from "../validators/users.validator";

@JsonController("/api/users")
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post("/")
  createUser(@Body() user: CreateUserValidator) {
    return this.userService.createUser(user);
  }

  @Get("/")
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }
}
