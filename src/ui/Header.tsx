import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';
export default function Header() {
    return (
        <header className='flex items-center justify-between border-b border-stone-400 bg-yellow-400 px-4 py-3'>
            <Link to='/'>Fast food</Link>
            <SearchOrder />
            <UserName />
        </header>
    );
}
