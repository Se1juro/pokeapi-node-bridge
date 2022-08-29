import { JsonController, Param, Get, UseBefore } from "routing-controllers";
import { AuthJwtMiddleare } from "../middlewares/auth.middleware";
import { UserService } from "../services/users.service";

@JsonController("/api/users")
@UseBefore(AuthJwtMiddleare)
export class UserController {
  constructor(protected readonly userService: UserService) {}

  /*   @Get("/")
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  } */
}
