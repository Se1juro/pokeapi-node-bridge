import { JsonController, Param, Get, QueryParam } from "routing-controllers";
import { PokemonService } from "../services/pokemon.service";

@JsonController("/api/pokemon")
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
