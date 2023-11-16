import { client } from '../features/services/client';

export const getMenu = async () => {
    try {
        const data = await client.get('/menu/get-menus');
        return data;
    } catch (error) {
        console.log(error);
    }
};
