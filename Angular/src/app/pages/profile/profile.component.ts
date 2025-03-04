import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsuarioService } from '../../shared/usuario.service';

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

  constructor(public usuarioService: UsuarioService) {
    this.user = new User(usuarioService.user.id_user,usuarioService.user.name, usuarioService.user.last_name, usuarioService.user.email, usuarioService.user.photo, usuarioService.user.password= null);
  }

nombreCompleto(): string {
  return this.user.name + ' ' + this.user.last_name;
}

public async actualizarUsuario(nuevoNombre: string, nuevoApellido: string, nuevoEmail: string, nuevaFoto: string, password1: string, password2: string) {
  if (nuevoNombre === '' && nuevoApellido === '' && nuevoEmail === '' && nuevaFoto === '') {
    this.miClase = 'noUsuario';
    this.mensaje = 'No se ha actualizado nada';
    return;
  }

  if (password1 !== password2) {
    this.miClase = 'noUsuario';
    this.mensaje = 'Las contraseñas no coinciden';
    return;
  }

  this.user.name = nuevoNombre || this.user.name || '';
  this.user.last_name = nuevoApellido || this.user.last_name || '';
  this.user.email = nuevoEmail || this.user.email || '';
  this.user.photo = nuevaFoto || this.user.photo || '';
  this.user.password = password1 || this.user.password;


  await this.usuarioService.actualizarUsuario(this.user);

  console.log(this.user.name);
  this.user.name = this.usuarioService.user.name;
  this.user.last_name = this.usuarioService.user.last_name;
  this.user.email = this.usuarioService.user.email;
  this.user.photo = this.usuarioService.user.photo;
  console.log(this.user.name);
  this.miClase = 'usuario';
  this.mensaje = 'Usuario actualizado correctamente';
}

  ngOnInit(): void {
  }
}

