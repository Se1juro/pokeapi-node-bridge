import { JsonController, Get } from "routing-controllers";

@JsonController()
export class UserController {
  @Get("/health")
  getAll() {
    return "Server ON";
  }
}
