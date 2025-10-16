import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ISale, ISaleItemForSale, ISaleResume, ISaleWithSaleItem } from '../../interfaces/ISale';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { IProduct } from '../../interfaces/IProduct';
import { PDVService } from '../../services/pdv.service';
import { PaymentType } from '../../enum/PaymentEnum';
import { AlertComponent, IAlertComponent } from '../../components/alert/alert.component';
import { StatusAlertEnum } from '../../enum/StatusAlertEnum';

@Component({
  selector: 'app-pdv-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './pdv-page.component.html',
  styleUrl: './pdv-page.component.css'
})
export class PDVPageComponent implements OnInit {

  searchProduct = new FormControl('');
  quantitySaleItem = new FormControl(0);

  isVisible = false;
  
  currentSale: ISaleResume = { uuid: crypto.randomUUID(), total: 0, userId: 1, paymentType: PaymentType.PIX }
  currentProduct: IProduct | null = null

  saleItemList: ISaleItemForSale[] = [];

  productSearch: string = "";
  productsFounded: any[] = [];

  alertData: IAlertComponent | null = null;
  showAlert: boolean = false;



  // Sale
  private currentSaleToSend: ISaleItemForSale | null= {
    saleUUID: this.currentSale.uuid,
    productId: 0,
    product: null,
    userId: 0,
    total: 0,
    quantity: 0
  }

  constructor(private productService: ProductService, private pdvService: PDVService) { }

  ngOnInit(): void {
    this.searchProduct.valueChanges
      .pipe(  // controla o fluxo de dados, transforma e etc.
        filter((value): value is string => value !== null && value.trim() !== ''),
        debounceTime(300),
        switchMap(value => this.productService.search(value)) //Quando chega um dado novo, ele cancela a requisição antiga (se ainda estiver rolando) e só faz a mais nova.
      )
      .subscribe(response => {
        this.productsFounded = response?.data ?? [];
        this.toogleMenu(true);
      });
  }

  async onSubmit() {

    this.productService.search(this.productSearch).subscribe({

      next: response => {
        console.log(JSON.stringify(response.data))
        this.productsFounded = response.data ?? [];
      },

      error: e => {
        console.error("Erro na busca:", e);
      }
    });
  }

  selectCurrentItem(product: IProduct) {
    console.log("valor=", JSON.stringify(product))
    this.currentProduct = product;
  }

  addItemToSale() {

    if (!this.currentProduct) return;
    
    const quantity = this.quantitySaleItem?.value ?? 0;
    const price = this.currentProduct?.price ?? 0;

    const newSaleItem: ISaleItemForSale = {
      saleUUID: this.currentSale.uuid,
      productId: this.currentProduct.id,
      product: this.currentProduct,
      userId: 1,
      quantity: quantity,
      total: quantity * price
    };

    this.saleItemList.push(newSaleItem);
    this.currentSale.total += newSaleItem.total;
    this.currentSaleToSend = null;

    console.log("Add Sale Item:", JSON.stringify(this.currentSaleToSend, null, 0), "To Sale:", this.currentSale.uuid);
  }

  processSale() {

    const saleWithSaleItem: ISaleWithSaleItem = { 
      sale: this.currentSale,
      saleItemList: this.saleItemList 
    }

    this.pdvService.createCompleteSale(saleWithSaleItem).subscribe({
      next: (res: any) => {
        this.showCustomAlert(StatusAlertEnum.SUCCESS, "Sucesso", res.message);
      },
      error: (res: any) => {
        console.log("Error to Create Sale", JSON.stringify(res.data))
        this.showCustomAlert(StatusAlertEnum.ERROR, "Erro", res.message);
      },
      complete: () => { this.cleanValues(); }
    });
  }

  toogleMenu(isOpen: boolean) {
    this.isVisible = isOpen;
  }

  showCustomAlert(type: StatusAlertEnum, title: string, message: string): void {
    this.alertData = { title: title, message: message, type: type };
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }

  cleanValues(): void {
    // Reset form controls
    this.searchProduct.reset('');
    this.quantitySaleItem.reset(0);

    // Reset visibility
    this.isVisible = false;

    // Reset current sale
    this.currentSale = {
      uuid: crypto.randomUUID(),
      total: 0,
      userId: 1,
      paymentType: PaymentType.PIX
    };

    // Reset current product
    this.currentProduct = null;

    // Reset sale items
    this.saleItemList = [];

    // Reset search
    this.productSearch = '';
    this.productsFounded = [];
  }

}
