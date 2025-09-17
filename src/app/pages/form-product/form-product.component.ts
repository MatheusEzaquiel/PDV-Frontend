import { Component } from '@angular/core';
import { APIRoutes } from '../../utils/APIRoutes';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/alert/alert.component';


@Component({
  selector: 'app-form-product',
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent {

  showAlert = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';

  product = {
    id: 0,
    name: '',
    price: 0,
    sku: '',
    barcode: '',
    stockQuantity: 0,
    categoryId: 0
  };

  //product: Product = new Product();

  categories = [
    { id: 1, name: 'Bebidas' },
    { id: 2, name: 'Higiene' },
    { id: 3, name: 'Alimentos' }
  ];

  loading = false;
  incorrect = false;

  constructor(private productService: ProductService) { }

  async onSubmit() {
    
    this.loading = true;

    if (
      this.product.name != null &&
      this.product.price > 0 &&
      this.product.sku != null &&
      this.product.barcode != null &&
      this.product.stockQuantity > 0 &&
      this.product.categoryId > 0
    ) {
      
      this.productService.create(this.product).subscribe(
      (response) => {
        this.productService.checkResponseStatus(response);
        console.log(response.message);

        if (response.status !== 200 && response.status !== 201) {
          this.incorrect = true;
          this.showCustomAlert('error', 'Erro', 'Não foi possível salvar o produto.');
        } else {
          this.showCustomAlert('success', 'Sucesso', 'Produto salvo com sucesso.');
        }

        this.loading = false;
      },
      (error) => {
        console.error('e:', error.message);
        this.incorrect = true;
        this.showCustomAlert('error', 'Erro', error.message);
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.showCustomAlert('warning', 'Aviso', 'Preencha todos os campos corretamente.');
    }
}

  
  triggerAlert() {
    this.alertTitle = 'Sucesso!';
    this.alertMessage = 'A ação foi realizada com êxito.';
    this.alertType = 'success';
    this.showAlert = true;

    setTimeout(() => this.showAlert = false , 3000);
  }
    
  showCustomAlert(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string):void {
    this.alertType = type;
    this.alertTitle = title;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}