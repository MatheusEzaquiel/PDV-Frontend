import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { UserRole } from '../../models/UserRole.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-panel',
  imports: [CommonModule, RouterModule],
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.css'
})

export class UsersPanelComponent {

  users: UserRole[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsersWithRole().subscribe(
      (response) => {
        console.log(response.data);
        this.users = response.data ?? [];
      },
      (error) => {
        console.error('Erro ao buscar usuários', error.message);
      }
    );
  }

  removeUser(userId: number): void {
    console.log("user ID =", userId)
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log(response.message);
        this.users = this.users.filter(user => user.userId !== userId);
      },
      (error) => {
        console.error('Erro ao remover usuário:', error.message);
      }
    );
  }

  goToEditPage(userId: number) {
    this.router.navigate(['/user/edit/', userId]);
  }

}
