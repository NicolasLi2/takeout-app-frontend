import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import axios from 'axios';
import UploadImage from '../services/UploadImage';
import { client } from '../services/client';

interface IFileInputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label?: string;
}

export default function MenuForm<IFileInputProps>() {
    const toastId = useRef(null);
    const [progress, setProgress] = useState(0);
    const inputStyle =
        'rounded p-1 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 text-stone-800 bg-stone-100 border';
    const formItemStyle = 'mb-2 flex justify-between items-center';

    const methods = useForm({
        mode: 'onBlur',
        // defaultValues: {
        //     productName: '',
        //     unitPrice: 0,
        //     quantity: 0,
        //     productImage: '',
        // },
    });

    const onSubmit = methods.handleSubmit((values) => {
        console.log('values', values);
        const formData = new FormData();
        // values.productImage is an Array
        formData.append('productImage', values.productImage[0]);
        formData.append('productName', values.productName);
        formData.append('unitPrice', values.unitPrice);
        formData.append('quantity', values.quantity);
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (p) => {
                const progress = p.loaded / p.total;

                // check if we already displayed a toast
                if (toastId.current === null) {
                    toastId.current = toast('Upload in Progress', { progress });
                } else {
                    toast.update(toastId.current, { progress });
                }
            },
        };

        client
            .post('/menu/create-menu', formData, config)
            .then(({ data }) => {
                console.log('server res: ', data);
                toast.done(toastId.current);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className='w-1/2 mx-auto mt-5'>
                <div className={formItemStyle}>
                    <label htmlFor='name'>Product Name</label>
                    <input
                        id='name'
                        type='text'
                        className={inputStyle}
                        {...methods.register('productName')}
                    />
                </div>
                <div className={formItemStyle}>
                    <label htmlFor='price'>Unit Price</label>
                    <input
                        id='price'
                        type='number'
                        step='0.01'
                        className={inputStyle}
                        {...methods.register('unitPrice')}
                    />
                </div>
                <div className={formItemStyle}>
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                        id='quantity'
                        type='number'
                        className={inputStyle}
                        {...methods.register('quantity')}
                    />
                </div>
                <UploadImage name='productImage' />

                <button
                    type='submit'
                    className='bg-blue-700 hover:bg-blue-800 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:outline-blue-500'
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
}
