
export class Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  

  constructor() {
    this.id = 0;
    this.name = '';
    this.sku = '';
    this.barcode = '';
    this.price = 0;
    this.stockQuantity = 0;
    this.categoryId = 0;
  }
}
  