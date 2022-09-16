import ImagePicker from 'react-native-image-crop-picker';

const openCamera = (index, cb) => {
    const myAction = index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
    const options = {
        width: 700,
        height: 950,
        cropping: true
    };
    myAction(options)
    .then(image => {
        cb(image);
    })
};
export default openCamera;
