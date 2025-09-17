import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role } from '../../models/Role.model';

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
  roles: Role[];

  incorrect: boolean;
  loading: boolean;


  staticRoles: Role[] = [
    { id: 1, name: 'Administrador'},
    { id: 2, name: 'Usuário' },
    { id: 3, name: 'Gerente' }
  ];

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.name = "";
    this.email = "";
    this.role = "";
    this.roles = this.staticRoles;
    this.selectedRoleId = 0
    this.incorrect = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.userId = parseInt(paramId);

        this.loadUserData();
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

  loadUserData() {
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
