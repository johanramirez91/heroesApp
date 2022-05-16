import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
    },
    {
      id: 'Marvel Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizaHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/lista']);
        this.openSnackBar('Se actualizó un héroe');
      });
    } else {
      this.heroeService
        .saveHeroe(this.heroe)
        .subscribe((heroe) =>
          this.router.navigate(['/heroes/editar', heroe.id])
        );
    }
  }

  eliminarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '25rem',
      data: { ...this.heroe },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroeService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes/lista']);
          this.openSnackBar('Se creó un héroe');
        });
      }
    });
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
  }
}
