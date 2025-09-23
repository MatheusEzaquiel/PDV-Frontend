import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IRole } from '../../interfaces/IRole';
import { UsersPanelComponent } from "../../components/users-panel/users-panel.component";
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

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

  isUpdatedUser: boolean | null = null;
  loading: boolean;

  roles: IRole[] = [];

  @Output() userCreated = new EventEmitter<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService) {
    this.name = "";
    this.email = "";
    this.role = "";
    this.selectedRoleId = 0
    this.loading = false;
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  async onSubmit() {

    this.loading = true;

    if (this.name != null && this.email != null && this.selectedRoleId != null) {

      this.userService.createUser(this.name, this.email, this.selectedRoleId)
        .subscribe(
          (response) => {
            this.userService.checkResponseStatus(response);
            this.isUpdatedUser = true;
            this.userCreated.emit();
            this.resetAlert();
            console.log(response.message);
          },
          (error) => {
            this.isUpdatedUser = false;
            console.error('Erro ao Criar usuário:', error.message);
          });
      this.loading = false;
    }
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe(
      response => {
        this.roles = response.data ?? [];
        console.log("retrieved roles:" + response.data?.length);
      }, error => {
        console.error('Error to get Roles: ', error);
        this.loading = false;
      });
  }

  resetAlert() {
    setTimeout(() => {
      this.isUpdatedUser = null;
    }, 3000);
  }
}
