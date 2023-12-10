import { Component } from '@angular/core';
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
export class IndexComponent {
  //Atributo con el tipo de dato de la interfaz
  public data : Pelicula[] = [];
  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatospeliculaService) { }
 //Ejecución de la petición y suscripción de la respuesta
  ngOnInit() {
   this.dataProvider.getResponse().subscribe((response) => { 
     let dataArray = (response as Pelicula[]); 
     this.data = dataArray.slice(0,10);
   })
}
}
