import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from  '@angular/common/http';
//Importación de la interfaz
import { Pelicula } from '../../interfaz/pelicula';
//Importación del servicio
import { DatospeliculaService } from '../../providers/datospelicula.service'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DatospeliculaService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent implements OnInit {
  movieIds: string[] = ['tt0111161', 'tt0468569', 'tt1375666', 'tt0137523',
   'tt0109830', 'tt0167260', 'tt0110912', 'tt0120737',
    'tt0133093', 'tt0245429', 'tt0068646', 'tt0050083'];
  //Atributo con el tipo de dato de la interfaz
  public data : Pelicula[] = [];
  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatospeliculaService) { }
 //Ejecución de la petición y suscripción de la respuesta

  ngOnInit(): void {
    this.dataProvider.getMoviesByIds(this.movieIds).subscribe((movies) => {
      this.data = movies;
    });
  }
}
