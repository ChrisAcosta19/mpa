import { Injectable } from '@angular/core';
//Importación del HttpClient
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatospeliculaService {
  //Atributo URL
  private URL: string = 'https://tiendapeliculasonline-default-rtdb.firebaseio.com/collection.json';
  //Inyección de dependencia del HttpClient
  constructor(private http:HttpClient) { }

  //Método con la petición HTTP
  getResponse() {
    return this.http.get(this.URL);
}
}