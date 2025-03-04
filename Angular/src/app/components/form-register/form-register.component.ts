import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../shared/usuario.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})

export class FormRegisterComponent {

  public registerForm: FormGroup;

  public usuario: UsuarioService;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) {

    this.usuario = new UsuarioService();

    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['',[ Validators.required,this.noIgual]]  
    });
  }

private noIgual(control: AbstractControl) {

  let resultado = {diferentes: true}; 

  if(control.parent?.value.password === control.value) 

    resultado = null;

    return resultado;
  
}

  public async registrarse() {
    if(this.registerForm.value.password  !== this.registerForm.value.password2) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const datosModificados = new User(
      null,
      this.registerForm.value.nombre,
      this.registerForm.value.apellidos,
      this.registerForm.value.email,
      this.registerForm.value.url,
      this.registerForm.value.password
    );

    await this.usuario.register(datosModificados);
    if (this.usuario.logueado  === true) {
      this.router.navigate(['/books']);
      localStorage.setItem('user', JSON.stringify(this.usuario));
    }
    this.registerForm.reset();
  }
}
