import { BASE_URL } from '@/config';

export async function fetchProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Что-то пошло не так...');
        }
        return await response.json();
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}