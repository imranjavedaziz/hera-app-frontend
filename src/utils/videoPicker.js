// VIDEO PICKER
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Strings from '../constants/Strings';
import { useDispatch } from "react-redux";
import { showAppToast } from "../redux/actions/loader";

const videoPicker = index => {
  const dispatch = useDispatch();
  const myAction =
    index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
  const options = {
    mediaType: 'video',
    allowsEditing: true,
  };
  return new Promise((resolve, reject) => {
    myAction(options)
      .then(video => {
        if (video?.duration > 59000) {
          dispatch(showAppToast(true, Strings.sm_create_gallery.videoDuration));
        } else {
          resolve(video);
        }
      })
      .catch(reject);
  });
};
export default videoPicker;
