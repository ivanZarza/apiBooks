import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  public usuario: Usuario;

  constructor() {
    this.usuario = new Usuario();
  }

  public onSubmit(form:NgForm) {
    console.log(this.usuario);
    console.log(form.value);
  }

}
