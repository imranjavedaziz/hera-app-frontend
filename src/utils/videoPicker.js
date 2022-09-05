import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import uploadS3 from './uploadS3';

const videoPicker = ()=>{
    return new Promise((resolve,reject)=>{
        ImagePicker.openCamera({
            mediaType: "video",
          }).then((video) => {
            console.log(video);
            const s3uploadData = {
                uri: video.path,
                name: Math.random()+'.mp4',
                type: video.mime,
              };
              uploadS3(s3uploadData)
              .then(location=>{
                console.log('location',location);
              })
              .catch(err=>{
                console.log('err',err);
              })
          });
    })
}
export default videoPicker;
