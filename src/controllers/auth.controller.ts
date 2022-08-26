import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import { AuthService } from "../services/auth.service";
import { SigInValidator } from "../validators/sigIn.validator";

@JsonController("/api/auth")
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post("/sigin")
  login(@Body() user: SigInValidator) {
    return this.authService.sigIn(user);
  }
}
