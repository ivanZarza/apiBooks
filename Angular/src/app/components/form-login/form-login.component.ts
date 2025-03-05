import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../shared/usuario.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  public user: User;

  constructor(public usuario: UsuarioService, private router: Router) {
    this.user = new User(null, '', '', '', '', '');
  }

  public async onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    await this.usuario.login(this.user);
    if (this.usuario.logueado  === true) {
      this.router.navigate(['/books']);
      localStorage.setItem('user', JSON.stringify(this.usuario));
    }
    form.resetForm();
  }
}
// 