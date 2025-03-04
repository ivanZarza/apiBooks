import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../shared/usuario.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-logout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-logout.component.html',
  styleUrl: './form-logout.component.css'
})
export class FormLogoutComponent {

  public user: User;

  constructor(public usuario: UsuarioService, private router: Router) {
    this.user = new User(null, '', '', '', '', '');
  }

  public async onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    await this.usuario.logout(this.user);
    if (this.usuario.logueado === false) {
      this.router.navigate(['/home']);
    }
    form.resetForm();
  }
}

