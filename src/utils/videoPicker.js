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
    myAction(options)
      .then(video => {
        console.log(video?.duration, "video?.duration");
        let duration = ((video?.duration % 60000) / 1000).toFixed(0);
        console.log(duration, "duration");
        if (duration > 60) {
          alert(Strings.sm_create_gallery.videoDuration);
        } else {
          resolve(video);
        }
      })
      .catch(reject);
  });
};
export default videoPicker;
