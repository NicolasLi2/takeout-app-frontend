import Cloud from '../../utils/Cloud';

// var myCropWidget = cloudinary.createUploadWidget(
//     {
//         cloudName: 'demo',
//         uploadPreset: 'preset1',
//         folder: 'widgetUpload',
//         cropping: true,
//     },
//     (error, result) => {
//         console.log(error, result);
//     }
// );

export default function Menu() {
    return (
        <div>
            <Cloud />
        </div>
    );
}
