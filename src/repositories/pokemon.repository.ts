import { Service } from "typedi";
import { axiosCore } from "../core/axios.core";

@Service()
export class PokemonRepository {
  async getAllPokemon(limit: number, page: number) {
    const response = await axiosCore.get(`/pokemon`, {
      params: {
        limit,
        offset: limit * page - limit,
      },
    });
    return response.data;
  }
  async getPokemonByName(name: string) {
    const response = await axiosCore.get(`/pokemon/${name}`);
    return response.data;
  }
}
