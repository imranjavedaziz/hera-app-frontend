
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const videoPicker = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      mediaType: 'video',
      durationLimit: 60,
      allowsEditing:true
    })
      .then(video => {
        console.log("V",video)
        resolve(video);
      })
      .catch(reject);
  });
};
export default videoPicker;
