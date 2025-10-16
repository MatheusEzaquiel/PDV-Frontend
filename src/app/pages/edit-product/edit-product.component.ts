import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category.model';
import { StatusAlertEnum } from '../../enum/StatusAlertEnum';
import { AlertComponent, IAlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  productId: number | null = null;
  product: Product = new Product();
  categories: Category[] = [];

  isCorrect: boolean = false;

  alertData: IAlertComponent | null = null;
  showAlert: boolean = false;

  /*categories = [
    { id: 1, name: 'Bebidas' },
    { id: 2, name: 'Higiene' },
    { id: 3, name: 'Alimentos' }
  ];*/

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.loadCategories();

    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.productId = parseInt(paramId);
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(productId: number): void {

    this.productService.getById(productId).subscribe({

      next: (response: any) => {

        this.product = Object.assign(new Product(), response.data);
        console.log("Product Qty:" + this.product.stockQuantity);

      },
      error: (ex) => {
        console.log("Erro ao Buscar Produto!", ex);
      }
    });
  }

  loadCategories(): void {

    this.categoryService.getAll().subscribe({

      next: (response: any) => {
        this.categories = response.data as Category[]; // json as tipo do Obj
      },
      error: (ex) => {
        console.log("e:", ex);
      }
    });
  }

  onSubmit(): void {

    console.log("Update data of product " + this.product.sku);
    this.productService.update(this.product)
      .subscribe(

        (response) => {
          if (response.status != 200 && response.status != 201) {
            this.isCorrect = true;
            this.showCustomAlert(StatusAlertEnum.ERROR, "Erro", "Não foi possível salvar o produto.");
          } else {
            this.showCustomAlert(StatusAlertEnum.SUCCESS, "Sucesso", response.message);
          }
         
        },
        (error) => {
          console.error(error.message);
          this.isCorrect = true;
        }
      );

    this.isCorrect = false;
  }

  
  showCustomAlert(type: StatusAlertEnum, title: string, message: string):void {

    this.alertData = {title: title, message: message, type: type};
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
