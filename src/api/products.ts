import { api } from "./api";


export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
}

export const productsApi = {
    getAll: (): Promise<Product[]> => {
        return api.get<Product[]>('/products');
    },
};