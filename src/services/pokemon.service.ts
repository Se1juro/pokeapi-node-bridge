import { Service } from "typedi";
import { IPokemon } from "../interfaces/pokemons.interface";

import { PokemonRepository } from "../repositories/pokemon.repository";

@Service()
export class PokemonService {
  constructor(protected readonly pokemonRepository: PokemonRepository) {}
  async getAllPokemon(limit: number = 12, page: number = 1) {
    return await this.pokemonRepository.getAllPokemon(limit, page);
  }
  async getPokemonByName(name: string, page: number = 1) {
    return await this.pokemonRepository.getPokemonByName(name, page);
  }
}
