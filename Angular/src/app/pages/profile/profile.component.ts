import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public user : User;
  public miClase: string = '';
  public mensaje: string = '';

  constructor() {
    this.user = new User(1, 'Ivan', 'Zarza Estevez', 'ivanzarzaestevez@gimeil.com', '../../../assets/img/Captura desde 2025-01-02 08-34-45 (copia).png');

  }

nombreCompleto(): string {
  return this.user.name + ' ' + this.user.last_name;
}

lanzarFuncion(nuevoNombre: string, nuevoApellido: string, nuevoEmail: string, nuevaFoto: string): void {
  if (nuevoNombre === '' && nuevoApellido === '' && nuevoEmail === '' && nuevaFoto === '') {
    this.miClase = 'noUsuario';
    this.mensaje = 'No se ha actualizado nada';
    return;
  }

  if (nuevoNombre === '') {
    nuevoNombre = this.user.name;
  }
  if (nuevoApellido === '') {
    nuevoApellido = this.user.last_name;
  }
  if (nuevoEmail === '') {
    nuevoEmail = this.user.email;
  }
  if (nuevaFoto === '') {
    nuevaFoto = this.user.photo;
  }



  console.log(this.user.name);
  this.user.name = nuevoNombre;
  this.user.last_name = nuevoApellido;
  this.user.email = nuevoEmail;
  this.user.photo = nuevaFoto;
  console.log(this.user.name);
  this.miClase = 'usuario';
  this.mensaje = 'Usuario actualizado correctamente';
}

  ngOnInit(): void {
  }
}

