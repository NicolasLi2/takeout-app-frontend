import { useLoaderData } from 'react-router-dom';
import MenuForm from './MenuForm';
import { getMenu } from '../../api/menu';
import MenuItem from './MenuItem';

export default function Menu() {
    const menu = useLoaderData();
    console.log(menu);

    return (
        <ul className='divide-y divide-stone-200 px-2'>
            {menu.map((product) => (
                <MenuItem product={product} key={product.id} />
            ))}
        </ul>
    );
}
