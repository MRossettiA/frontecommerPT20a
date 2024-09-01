interface IProduct{
    map(arg0: (product: any) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}
export default IProduct;