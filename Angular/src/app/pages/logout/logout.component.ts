import { Component } from '@angular/core';
import { FormLogoutComponent } from '../../components/form-logout/form-logout.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ FormLogoutComponent ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

}
