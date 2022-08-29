"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRepository = void 0;
const typedi_1 = require("typedi");
const axios_core_1 = require("../core/axios.core");
let PokemonRepository = class PokemonRepository {
    getAllPokemon(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_core_1.axiosCore.get(`/pokemon`, {
                params: {
                    limit,
                    offset: limit * page - limit,
                },
            });
            const result = response.data.results;
            const formatPokemons = yield Promise.all(result.map((pokemon) => __awaiter(this, void 0, void 0, function* () { return yield this.getPokemonByName(pokemon.name); })));
            return {
                rows: formatPokemons,
                count: response.data.count,
                currentPage: page,
                limit,
                totalPages: Math.ceil(response.data.count / limit),
            };
        });
    }
    getPokemonByName(name, page = 1, limit = 12) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (yield axios_core_1.axiosCore.get(`/pokemon/${name}?page=${page}?limit=${limit}`)).data;
            return {
                name: response.name,
                height: response.height,
                id: response.id,
                sprites: { front_default: response.sprites.front_default },
                stats: response.stats.map((stat) => ({
                    base_stat: stat.base_stat,
                    name: stat.stat.name,
                })),
                base_experience: response.base_experience,
                abilities: response.abilities.map((ability) => ({
                    is_hidden: ability.is_hidden,
                    name: ability.ability.name,
                })),
            };
        });
    }
};
PokemonRepository = __decorate([
    (0, typedi_1.Service)()
], PokemonRepository);
exports.PokemonRepository = PokemonRepository;
