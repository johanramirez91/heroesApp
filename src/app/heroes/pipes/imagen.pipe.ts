import { Heroe } from './../interfaces/heroes.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_image) {
      return `assets/no-image.png`;
    } else if (heroe.alt_image) {
      return heroe.alt_image;
    }
    return `assets/heroes/${heroe.id}.jpg`;
  }
}
