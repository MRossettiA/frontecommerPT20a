import IProduct from "./Product";

interface ICategory {
    id: number,
    name:string;
    product: IProduct
};
export default ICategory;