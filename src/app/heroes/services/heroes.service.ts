import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private hhtp: HttpClient) {}

  getHeroes() {
    return this.hhtp.get<Heroe[]>('http://localhost:3000/heroes');
  }
}
