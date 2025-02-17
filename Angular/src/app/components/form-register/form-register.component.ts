import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})

export class FormRegisterComponent {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['',[ Validators.required,this.noIgual]]  
    });
  }

private noIgual(control: AbstractControl) {

  let resultado = {diferentes: true}; 

  if(control.parent?.value.password === control.value) 

    resultado = null;

    return resultado;
  
}

public prueba() {
  console.log(this.registerForm.value);
}

}
