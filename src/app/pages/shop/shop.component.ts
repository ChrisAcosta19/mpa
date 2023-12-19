import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from  '@angular/common/http';
//Importación de la interfaz
import { Pelicula } from '../../interfaz/pelicula';
//Importación del servicio
import { DatospeliculaService } from '../../providers/datospelicula.service'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DatospeliculaService],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent implements OnInit {
  movieIds: string[] = ['tt0111161','tt0068646','tt0468569','tt0071562','tt0047478',
'tt0108052','tt0167260','tt0110912','tt0120737','tt0060196',
'tt0109830','tt0137523','tt0167261','tt1375666','tt0080684',
'tt0133093','tt0099685','tt0073486','tt0114369','tt0038650'];

//Atributo con el tipo de dato de la interfaz
  public data : Pelicula[] = [];
  public currentSortColumn: string = '';
  public isSortAscending: boolean = false;

  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatospeliculaService) { }
 
  //Ejecución de la petición y suscripción de la respuesta
  ngOnInit(): void {
    this.dataProvider.getMoviesByIds(this.movieIds).subscribe((movies) => {
      this.data = movies;
    });
  }

  // Método para manejar el clic en los botones de ordenamiento
  public handleSortClick(column: string): void {
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.isSortAscending = true;
      this.currentSortColumn = column;
    }

    this.data = [...this.data].sort((a, b) => {
      if (this.isSortAscending) {
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });
  }

  // Método para aplicar el filtro por año
  public applyYearFilter(yearRange: string): void {
    if (yearRange === 'all') {
        // Si se selecciona "All Years", mostrar todas las películas
        this.ngOnInit();
    } else {
        // Filtrar por el rango de años seleccionado
        const [startYear, endYear] = yearRange.split('-');
        this.data = this.data.filter(movie => {
            const movieYear = parseInt(movie.Year, 10);
            return movieYear >= parseInt(startYear, 10) && movieYear <= parseInt(endYear, 10);
        });
    }
  }

  // Método para aplicar el filtro por año
  public applyRuntimeFilter(RuntimeRange: string): void {
    if (RuntimeRange === 'all') {
        // Si se selecciona "All Runtime", mostrar todas las películas
        this.ngOnInit();
    } else {
        // Filtrar por el rango de duración seleccionado
        const [startRuntime, endRuntime] = RuntimeRange.split('-');
        this.data = this.data.filter(movie => {
            const movieRuntime = parseInt(movie.Runtime, 10);
            return movieRuntime >= parseInt(startRuntime, 10) && movieRuntime <= parseInt(endRuntime, 10);
        });
    }
  }

  public applyIMDBRatingFilter(column: string): void {
    if (column === 'all') {
      // Si se selecciona "All imdbRating", mostrar todas las películas
      this.ngOnInit();
    } else {
      this.data = this.data.filter(movie => {
        if (column === '>= 9.0') {
          return parseInt(movie.imdbRating, 10) >= 9.0;
        } else {
          return movie.imdbRating === column;
        }
      });
    }
  }
}