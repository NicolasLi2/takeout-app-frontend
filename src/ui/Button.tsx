import { Link } from 'react-router-dom';

export default function Button({ children, to, onClick, type, disabled }) {
    const baseStyle =
        'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase text-stone-800 tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:outline-none  focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
    const style = {
        primary: baseStyle + ' px-4 py-3 md:px-6 md:py-4',
        small: baseStyle + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: baseStyle + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary:
            'inline-block text-sm rounded-full bg-transparent border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:outline-none hover:text-stone-800 focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-6 md:py-3.5',
    };

    if (to) {
        return (
            <Link to={to} className={style[type]}>
                {children}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={style[type]}
            >
                {children}
            </button>
        );
    }

    return (
        <button className={style[type]} disabled={disabled}>
            {children}
        </button>
    );
}
