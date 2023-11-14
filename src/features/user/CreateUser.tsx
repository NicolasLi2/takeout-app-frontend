import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { updateName } from './userSlice';

export default function CreateUser() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) return;
        dispatch(updateName(username));
        navigate('/menu');
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className='mb-4 text-sm md:text-base text-stone-600'>
                😉 Welcome! please tell us your name.
            </p>
            <input
                type='text'
                value={username}
                placeholder='Your full name'
                onChange={(e) => setUsername(e.target.value)}
                className='input mb-8 w-72'
            />
            {username !== '' && (
                <div>
                    <Button type='primary'>Start ordering</Button>
                </div>
            )}
        </form>
    );
}
