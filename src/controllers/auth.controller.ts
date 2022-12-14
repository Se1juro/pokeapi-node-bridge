import { JsonController, Body, Post } from "routing-controllers";
import { IUserLogged } from "../interfaces/userLogged.interface";
import { AuthService } from "../services/auth.service";
import { SigInValidator } from "../validators/sigIn.validator";
import { CreateUserValidator } from "../validators/users.validator";

@JsonController("/api/auth")
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post("/sigin")
  login(@Body() user: SigInValidator) {
    return this.authService.sigIn(user);
  }

  @Post("/signup")
  signUp(@Body() user: CreateUserValidator) {
    return this.authService.signUp(user);
  }

  @Post("/check")
  checkAuth(@Body() userLogged: IUserLogged) {
    return this.authService.checkAuth(userLogged);
  }
}
