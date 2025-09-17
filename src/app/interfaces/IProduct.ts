export interface IProductNoID {
    name: string;
    price: number;
    sku: string;
    barcode: string;
    stockQuantity: number;
    categoryId: number;
}

export interface IProduct {
    saleId: number;
    id: number;
    name: string;
    price: number;
    sku: string;
    barcode: string;
    stockQuantity: number;
    categoryId: number;
}