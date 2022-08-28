export interface IPokemon {
  name: string;
  id: number;
  height: number;
  sprites: {
    front_default: string;
  };
  stats: IStat[];
  base_experience: number;
  abilities: IAbilities[];
}

export interface IStat {
  base_stat: number;
  name: string;
}

export interface IStatResponse {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface IAbilities {
  name: string;
  is_hidden: boolean;
}
