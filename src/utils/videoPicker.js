import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const videoPicker = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      mediaType: 'video',
    })
      .then(video => {
        resolve(video);
      })
      .catch(reject);
  });
};
export default videoPicker;
