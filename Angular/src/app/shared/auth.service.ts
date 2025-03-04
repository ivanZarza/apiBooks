import { Injectable } from '@angular/core';
import { Usuario } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario = new Usuario();

  constructor() {}

  public estaAutenticado(): boolean {

    console.log(this.usuario.logueado);
    return this.usuario.logueado;
    }

}

