import { Routes } from '@angular/router';

import { UsersPageComponent } from './pages/users-page/users-page.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { FormProductComponent } from './pages/form-product/form-product.component';
import { PDVPageComponent } from './pages/pdv-page/pdv-page.component';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [

      { path: 'users', component: UsersPageComponent },
      { path: 'user/:id', component: EditUserComponent },

      { path: 'products', component: ProductPageComponent },
      { path: 'product', component: FormProductComponent },
      { path: 'product/:id', component: EditProductComponent },

      { path: 'pdv', component: PDVPageComponent },

      { path: '', redirectTo: 'pdv', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
