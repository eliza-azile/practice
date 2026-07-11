import { api } from "./api";


export interface OrderItem {
    id: number;
    quantity: number;
}

export interface Order {
    id: number;
    userId: string;
    products: OrderItem[];
    total: number;
    status: string;
    date: string;
}

export const ordersApi = {
    getByUser: (userId: string): Promise<Order[]> => {
        return api.get<Order[]>(`/orders/${userId}`);
    },

    create: (order: Omit<Order, 'id' | 'status' | 'date'>): Promise<Order> => {
        return api.post<Order>('/orders', order);
    },
};