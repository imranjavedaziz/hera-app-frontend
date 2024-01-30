import ImagePicker from 'react-native-image-crop-picker';

const openCamera = (index, cb, isMulti = false, alreadyUploaded = 0) => {
  const remainingImages = 6 - alreadyUploaded;
  const myAction =
    index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
  const options = {
    width: 1000,
    height: 950,
    cropping: true,
    compressImageQuality: 0.5,
    multiple: isMulti,
    maxFiles: remainingImages,
  };
  myAction(options).then(image => {
    if (Array.isArray(image)) {
      const selectedImages = image.length;
      if (alreadyUploaded + selectedImages > 6) {
        alert(
          `${alreadyUploaded} already uploaded. Only ${remainingImages} will be selected for uploading`,
        );
      }
      image.forEach((img, i) => {
        if (i < remainingImages) {
          console.log(`${i + 1} image uploaded`);
          cb(img);
        }
      });
    } else {
      cb(image);
    }
  });
};
export default openCamera;
