import passport from "passport";
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
@UseBefore(AuthJwtMiddleare)
export class PokemonController {
  constructor(protected readonly pokemonService: PokemonService) {}

  @Get("/")
  getAllPokemon(
    @QueryParam("limit") limit: number,
    @QueryParam("page") page: number
  ) {
    return this.pokemonService.getAllPokemon(limit, page);
  }

  @Get("/:name")
  getPokemonByName(@Param("name") name: string) {
    return this.pokemonService.getPokemonByName(name);
  }
}
