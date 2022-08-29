import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { UsersRepository } from "../repositories/users.repository";
import { sign, verify } from "jsonwebtoken";
import { comparePassword } from "../utils/auth/comparePassword.util";
import { PRIVATE_KEY } from "../constants/auth.constant";
import { UserService } from "./users.service";
import { genSaltSync, hashSync } from "bcryptjs";
import { IUserLogged } from "../interfaces/userLogged.interface";
import { IUser } from "../interfaces/user.interface";

@Service()
export class AuthService {
  constructor(
    protected readonly userService: UserService,
    private usersRepository: UsersRepository
  ) {}
  async sigIn(user: IUser) {
    const { nickName, password } = user;
    const userLogin = await this.usersRepository.findByNickName(
      String(nickName)
    );

    if (!userLogin) throw new NotFoundError("Usuario no encontrado");
    const comparePass = comparePassword(
      String(password),
      String(userLogin.password)
    );

    if (!comparePass) throw new BadRequestError("Credenciales incorrectas");

    const token = await this.generateToken({
      id: String(userLogin._id),
      nickName,
      lastConnection: userLogin.lastConnection,
      team: userLogin.team,
      name: userLogin.name,
    });
    await this.userService.updateLastLoggin(userLogin);

    return { token };
  }

  async signUp(payload: IUser): Promise<{ user: IUser; token: string }> {
    const { nickName } = payload;
    const userExists = await this.usersRepository.findByNickName(
      String(nickName)
    );
    if (userExists) throw new BadRequestError("El usuario ya existe");
    const salt = genSaltSync(5);

    const hashPassword = hashSync(String(payload.password), salt);

    const newUser = await this.usersRepository.createUser({
      ...payload,
      lastConnection: new Date(),
      password: hashPassword,
    });

    const { password, ...userLogged } = newUser;

    const token = await this.generateToken(userLogged);

    return { user: userLogged, token };
  }

  async checkAuth(userLogged: IUserLogged) {
    const { token } = userLogged;
    if (!token) return { logged: false, user: undefined };
    try {
      const authVerify = verify(token, PRIVATE_KEY, {
        algorithms: ["RS256"],
      });
      return { user: authVerify, logged: true };
    } catch (error) {
      return {
        logged: false,
        user: undefined,
      };
    }
  }

  async generateToken(user: IUser): Promise<string> {
    const token = sign({ ...user }, PRIVATE_KEY, {
      expiresIn: 86400,
      algorithm: "RS256",
    });

    return token;
  }
}
