import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const videoPicker = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      mediaType: 'video',
      // durationLimit: 60,
      allowsEditing:true
    })
      .then(video => {
        console.log("V", ((video.duration % 60000) / 1000).toFixed(0))
        let duration = ((video.duration % 60000) / 1000).toFixed(0)
        if(duration>60){
          alert('Add a short 60 sec video')
        }else{
          resolve(video);
        }


      })
      .catch(reject);
  });
};
export default videoPicker;
