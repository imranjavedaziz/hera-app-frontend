import ImagePicker from 'react-native-image-crop-picker';

const openCamera = (index, cb, isMulti = false) => {
  const myAction =
    index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
  const options = {
    width: 1000,
    height: 950,
    cropping: true,
    compressImageQuality: 0.5,
    multiple: isMulti,
  };
  myAction(options).then(image => {
    if (Array.isArray(image)) {
      image.forEach((img, i) => {
        i < 6 && cb(img);
      });
    } else {
      cb(image);
    }
  });
};
export default openCamera;
