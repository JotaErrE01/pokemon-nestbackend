import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=250');
    
    const insrtPromisesArray = data.results.map(({ name, url }) => {
      const no = Number(url.split('/').at(-2));

      return { name, no };
    });

    await this.pokemonModel.insertMany(insrtPromisesArray);
    return 'Seed executed!';
  }
}
