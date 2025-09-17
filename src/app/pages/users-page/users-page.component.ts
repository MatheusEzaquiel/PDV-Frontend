import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Role } from '../../models/Role.model';
import { UsersPanelComponent } from "../../components/users-panel/users-panel.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-page',
  imports: [
    MatSlideToggleModule,
    FormsModule,
    CommonModule,
    UsersPanelComponent
],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})

export class UsersPageComponent {

  name: string;
  email: string;
  role: string;
  selectedRoleId: number;

  incorrect: boolean;
  loading: boolean;

  roles: Role[] = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Usuário' },
    { id: 3, name: 'Gerente' }
  ]; 

  constructor(private router: Router, private userService: UserService) {
    this.name = "";
    this.email = "";
    this.role = "";
    this.selectedRoleId = 0
    this.incorrect = false;
    this.loading = false;
  }

  async onSubmit() {
    
    this.loading = true;

    if(this.name != null && this.email != null && this.selectedRoleId != null) {

      console.log(this.name, this.email, this.selectedRoleId);

      this.userService.createUser(this.name, this.email, this.selectedRoleId)
        .subscribe(
          (response) => {
            this.userService.checkResponseStatus(response);
            console.log(response.message);
          },
          (error) => { console.error('Erro ao Criar usuário:', error.message);}
        );

        
      this.loading = false;
      this.incorrect = true;
      //this.router.navigate(['/']);
    }

  }
  
}
