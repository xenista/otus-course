import { BASE_URL } from '@/config';

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj[key]) keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
}

export async function fetchProducts(filter) {
    try {
        const response = await fetch(`${BASE_URL}/products?_expand=category&${objToQueryString(filter)}`);
        if (!response.ok) {
            throw new Error('Что-то пошло не так...');
        }
        return await response.json();
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error('Что-то пошло не так...');
        }
        return await response.json();
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function saveProduct(data) {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${BASE_URL}/products`, config);
        if (!response.ok) {
            throw new Error('Что-то пошло не так...');
        }
        return await response.json();
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}