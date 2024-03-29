import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 2rem;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private activateRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  regresar() {
    this.router.navigate(['/heroes/lista'], { skipLocationChange: true });
  }
}
