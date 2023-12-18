import { Injectable } from '@angular/core';
//Importación del HttpClient
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Pelicula } from '../interfaz/pelicula';

@Injectable({
  providedIn: 'root'
})

export class DatospeliculaService {
  private apiUrl = 'http://www.omdbapi.com';
  private apiKey = '14f06f65'; // Reemplaza con tu clave de API real


  //Inyección de dependencia del HttpClient
  constructor(private http: HttpClient) {}

  //Método con la petición HTTP
  getMoviesByIds(ids: string[]): Observable<Pelicula[]> {
    const requests = ids.map((id) =>
      this.http.get<Pelicula>(`${this.apiUrl}/?apikey=${this.apiKey}&i=${id}`)
    );

    // Combinar las solicitudes en paralelo
    return forkJoin(requests);
  }
}