import { PaymentType } from "../../enum/PaymentEnum";

export interface ISale {
    saleId: number;
    productId: number;
    userId: number;
    quantity: number;
    uuid: string;
}

export interface ISaleResume {
    uuid: string,
    total: number,
    userId: number,
    paymentType: PaymentType
}

export interface ISaleItemForSale {
    saleUUID: string;
    productId: number;
    userId: number;
    total: number;
    quantity: number;
}

export interface ISaleWithSaleItem {
    sale: ISaleResume;
    saleItemList: ISaleItemForSale[];
}