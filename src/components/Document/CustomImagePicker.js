import React, {useRef, useEffect} from 'react';
import {View, Alert, Linking} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

export const ActionSheetOptions = {
  openCamera: 'Open Camera',
  openGallery: 'Open Gallery',
  cancel: 'Cancel',
  remove: 'Remove Photo',
};

export default function CustomImagePicker({
  isVisible,
  title = 'Upload a Photo',
  imgWidth = 1000,
  imgHeight = 1000,
  croppingEnable = true,
  handleMediaFile,
  multiple = false,
  maxFilesCount = 1,
  cancelButtonIndex,
  destructiveButtonIndex,
  cancelHandler,
  addPhotoOptions = [
    ActionSheetOptions.openCamera,
    ActionSheetOptions.openGallery,
    ActionSheetOptions.cancel,
  ],
  freeCrop = false,
  showBottomContent = false,
}) {
  const photoUploadDialogRef = useRef();

  const onPhotoUploadDialogDone = index => {
    const item = addPhotoOptions[index];

    switch (item) {
      case ActionSheetOptions.openCamera:
        onLaunchCamera();
        cancelHandler();
        break;
      case ActionSheetOptions.openGallery:
        onOpenPhotos();
        cancelHandler();
        break;
      case ActionSheetOptions.cancel:
        cancelHandler();
        break;
      case ActionSheetOptions.remove:
        handleMediaFile(null);
        cancelHandler();
        break;
    }
  };

  const getTitleSubtitle = optionType => {
    if (optionType === ActionSheetOptions.openCamera) {
      return {title: 'Camera', subTitle: 'camera'};
    } else {
      return {title: 'Photos gallery', subTitle: 'photos gallery'};
    }
  };

  function openSetting(optionType) {
    const info = getTitleSubtitle(optionType);
    let alertTitle = info.title;
    let subtitle = info.subTitle;

    Alert.alert(
      alertTitle + ' access denied',
      'Please change your settings to allow Chip-in to access your ' + subtitle,

      [
        {text: 'Cancel'},
        {
          text: 'Go to Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
      {cancelable: false},
    );
  }
  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      width: imgWidth,
      height: imgHeight,
      cropping: croppingEnable,
      mediaType: 'photo',
      showCropFrame: false,
      hideBottomControls: true,
      freeStyleCropEnabled: freeCrop,
    })
      .then(images => {
        handleMediaFile(images);
      })
      .catch(e => {
        if (e.code === 'E_NO_CAMERA_PERMISSION') {
          openSetting(ActionSheetOptions.openCamera);
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Cannot run camera on simulator');
        }
        cancelHandler();
      });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      width: imgWidth,
      height: imgHeight,
      cropping: true,
      multiple: multiple,
      mediaType: 'photo',
      hideBottomControls: true,
      maxFiles: maxFilesCount,
      showsSelectedCount: true,
      showCropFrame: false,
      smartAlbums: ['UserLibrary'],
      freeStyleCropEnabled: freeCrop,
    })
      .then(images => {
        handleMediaFile(images);
      })
      .catch(error => {
        if (error.code === 'E_NO_LIBRARY_PERMISSION') {
          openSetting(ActionSheetOptions.openGallery);
        }
        cancelHandler();
      });
  };

  useEffect(() => {
    if (isVisible) {
      photoUploadDialogRef.current.show();
    }
  }, []);

  // styles.modalContainer  //if need to hide bottom content when actionsheet open add this styling inside view
  return (
    <View>
      <ActionSheet
        ref={photoUploadDialogRef}
        title={title}
        options={addPhotoOptions}
        cancelButtonIndex={cancelButtonIndex ?? 2}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={onPhotoUploadDialogDone}
      />
    </View>
  );
}
