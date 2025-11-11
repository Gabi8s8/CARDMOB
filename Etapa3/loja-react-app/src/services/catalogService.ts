import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getCatalog(): Promise<any[]> {
    try {
        const response = await fetch(`${apiUrl}/api/catalog`);
        const data = await response.json();
        // console.log(data)
        // return Promise.resolve(data.catalog)´
        return data.catalog;
    } catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}

export async function postOrder(customer: any, cartItems: any[]): Promise<any> {
    try {
        // enviar para o backend
        const orderData = { ...customer, items: cartItems };
        const response = await fetch(`${apiUrl}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Erro ao registrar o pedido');
        }
        const data = await response.json();
        console.log(data);
        return data;

    } 
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao enviar o pedido');
    }
}
