// VIDEO PICKER
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Strings from '../constants/Strings';

const videoPicker = index => {
  const myAction =
    index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
  const options = {
    mediaType: 'video',
    allowsEditing: true,
  };
  return new Promise((resolve, reject) => {
    console.log('LINE 14 CRASH');
    myAction(options)
      .then(video => {
        console.log('LINE 17 video');
        if (video?.duration > 59000) {
          alert(Strings.sm_create_gallery.videoDuration);
        } else {
          resolve(video);
        }
      })
      .catch(reject);
  });
};
export default videoPicker;
