import IProduct from "@/interfaces/Product";

export interface IOrder {
    id: number;
    status: string,
    date: Date;
    products: IProduct[]
}