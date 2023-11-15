import { useCallback, useEffect, useState } from 'react';
import { BiImage } from 'react-icons/bi';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const maxSize = 5242880; //5MB
// const maxSize = 122; //Test
const maxFileNumber = 1;

export default function UploadImage({ name }) {
    const [files, setFiles] = useState([]);

    const { register, unregister, setValue, watch } = useFormContext();
    // const files: File[] = watch(name);

    // const onDrop = useCallback((acceptedFiles) => {
    //     // Do something with the files
    // }, []);
    const onDrop = useCallback<DropzoneOptions['onDrop']>(
        (acceptedFiles) => {
            setValue(name, acceptedFiles, { shouldValidate: true });
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
        [setValue, name]
    );
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        acceptedFiles,
        fileRejections,
    } = useDropzone({
        maxFiles: maxFileNumber,
        noClick: true,
        accept: {
            'image/*': [],
        },
        minSize: 0,
        maxSize: maxSize,
        onDrop: onDrop,
        // onDrop: (acceptedFiles) => {
        //     setFiles(
        //         acceptedFiles.map((file) =>
        //             Object.assign(file, {
        //                 preview: URL.createObjectURL(file),
        //             })
        //         )
        //     );
        // },
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const isFileTooLarge =
        fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

    const isFileTooMany = fileRejections.length > maxFileNumber;

    return (
        <div className=''>
            <div className=''>
                <label
                    htmlFor='uploadPoster'
                    {...getRootProps()}
                    className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                >
                    {!isDragActive && !(thumbs.length > 0) ? (
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <div className='w-8 h-8 text-3xl mb-4 text-gray-500 dark:text-gray-400'>
                                <BiImage />
                            </div>
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span className='font-semibold'>
                                    Upload a product image
                                </span>{' '}
                            </p>
                        </div>
                    ) : (
                        <aside style={thumbsContainer}>{thumbs}</aside>
                    )}
                    {isFileTooLarge &&
                        toast.error('File too large!', {
                            toastId: 'file-too-large',
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored',
                        })}
                    {isFileTooMany &&
                        toast.error('File too many!', {
                            toastId: 'file-too-many',
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored',
                        })}
                    {isDragReject &&
                        toast.error('File rejected!', {
                            toastId: 'file-rejected',
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored',
                        })}

                    <input
                        {...getInputProps()}
                        name={name}
                        id='uploadPoster'
                        // type='file'
                        className='hidden'
                        multiple
                    />
                </label>
            </div>
        </div>
    );
}
