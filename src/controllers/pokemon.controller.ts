import {
  JsonController,
  Param,
  Get,
  QueryParam,
  UseBefore,
} from "routing-controllers";
import { AuthJwtMiddleare } from "../middlewares/auth.middleware";
import { PokemonService } from "../services/pokemon.service";

@JsonController("/api/pokemon")
// @UseBefore(AuthJwtMiddleare)
export class PokemonController {
  constructor(protected readonly pokemonService: PokemonService) {}

  @Get("/list")
  async getAllPokemon(
    @QueryParam("limit") limit: number,
    @QueryParam("page") page: number
  ) {
    return await this.pokemonService.getAllPokemon(limit, page);
  }

  @Get("/")
  getPokemonByName(
    @QueryParam("name") name: string,
    @QueryParam("page") page: number
  ) {
    return this.pokemonService.getPokemonByName(name, page);
  }
}
