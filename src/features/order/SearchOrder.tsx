import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchOrder() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search...'
                className='w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm  text-stone-400 focus:outline-none  focus:ring focus:ring-opacity-50 focus:ring-blue-400 sm:w-64 sm:focus:w-72 transition-all duration-300'
            />
        </form>
    );
}
