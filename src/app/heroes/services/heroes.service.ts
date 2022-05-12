import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseURL: string = environment.baseURL;
  constructor(private hhtp: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.hhtp.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.hhtp.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.hhtp.get<Heroe[]>(
      `${this.baseURL}/heroes?q=${termino}&_limit=5`
    );
  }
}
