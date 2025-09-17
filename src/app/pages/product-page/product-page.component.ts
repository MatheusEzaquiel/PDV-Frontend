import { Component } from '@angular/core';
import { Product } from '../../models/Product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  productList: Product[] = [];
  product: Product = new Product();


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  };
  

  loadProducts() {

    this.productService.getProducts().subscribe({
      next: (products: any) => {
        console.log(JSON.stringify(products.data))
        this.productList = products.data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  async goToCreatePage()  {
    this.router.navigate(["/product"]);
  }

  async edit(id: number)  {
    console.log("Edit register: " + id);
    this.router.navigate(["/product", id]);
  }
  
  async remove(id: number) {
    console.log("Remove register" + id);
    this.productService.remove(id).subscribe({
      next: (res: any) => {
        console.log(JSON.stringify(res.data));
        this.loadProducts();
      },
      error: (res: any) => {
        console.log(JSON.stringify(res.data))
      }
    });
  }


}
