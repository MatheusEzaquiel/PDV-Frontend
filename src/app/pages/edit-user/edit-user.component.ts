import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../interfaces/IRole';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  userId!: number;
  user: any;
  name: string;
  email: string;
  role: string;
  selectedRoleId: number;
  roles: IRole[];

  incorrect: boolean;
  loading: boolean;


  defaultRoles: IRole[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.name = "";
    this.email = "";
    this.role = "";
    this.roles = this.defaultRoles;
    this.selectedRoleId = 0
    this.incorrect = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.userId = parseInt(paramId);

        this.fetchUser();
        this.fetchRoles();
      }
    });
  }

  onSubmit() {
    console.log('Dados enviados:', this.name, this.email, this.selectedRoleId);
    this.userService.updateUser(this.userId, this.name, this.email, this.selectedRoleId)
    .subscribe(
      (response) => {console.log("atualizado!")},
      (error) => {console.log("Erro ao atualizar Usuário!")}
    );
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe(
      response => {
        this.defaultRoles = response.data ?? [];
        console.log("retrieved roles:" + response.data?.length);
    }, error => {
      console.error('Error to get Roles: ', error);
      this.loading = false;
    });
  }

  fetchUser() {
    this.userService.getById(this.userId).subscribe(response => {
      this.user = response.data;

      this.name = this.user.name;
      this.email = this.user.email;
      this.roles = this.user.roles;
      this.selectedRoleId = this.roles[0].id;
      this.loading = false;
    }, error => {
      console.error('Erro ao buscar usuário:', error);
      this.loading = false;
    });
    
  }

}
