import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { axiosCore } from "../core/axios.core";
import { IPokemon, IStatResponse } from "../interfaces/pokemons.interface";

@Service()
export class PokemonRepository {
  async getAllPokemon(limit: number, page: number) {
    const response = await axiosCore.get(`/pokemon`, {
      params: {
        limit,
        offset: limit * page - limit,
      },
    });
    const result: { name: string; url: string }[] = response.data.results;
    const formatPokemons = await Promise.all(
      result.map(
        async (pokemon): Promise<IPokemon> =>
          await this.getPokemonByName(pokemon.name)
      )
    );
    return {
      rows: formatPokemons,
      count: response.data.count,
      currentPage: page,
      limit,
      totalPages: Math.ceil(response.data.count / limit),
    };
  }
  async getPokemonByName(
    name: string,
    page: number = 1,
    limit: number = 12
  ): Promise<IPokemon> {
    const response: IPokemon = await (
      await axiosCore.get(`/pokemon/${name}?page=${page}?limit=${limit}`)
    ).data;
    return {
      name: response.name,
      height: response.height,
      id: response.id,
      sprites: { front_default: response.sprites.front_default },
      stats: response.stats.map((stat: any) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })),
      base_experience: response.base_experience,
      abilities: response.abilities.map((ability: any) => ({
        is_hidden: ability.is_hidden,
        name: ability.ability.name,
      })),
    };
  }
}
