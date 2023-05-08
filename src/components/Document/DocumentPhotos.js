import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {scaleWidth} from '../../utils/responsive';
import {Colors, Images, Strings} from '../../constants';
import {validateImage} from '../../utils/commonFunction';
import {Input_Type, validationBank} from '../../constants/Constants';
import {useDispatch} from 'react-redux';
import {showAppToast} from '../../redux/actions/loader';
import CustomImagePicker, {ActionSheetOptions} from './CustomImagePicker';
export default function DocumentPhoto({
  onRemoveImage = photo => {},
  selectedPhotos,
  setSelectedPhotos,
  handleError,
  error,
  title = Strings.UploadProof,
  maxFilesCount = 2,
  desc = 'In order to receive payment in your bank account, please enter the relevant information. HERA does not save any sensitive information.',
  strictToCount = false,
  multiple = true,
  freecrop = false,
}) {
  const dispatch = useDispatch();
  const [isPhotoPopupVisible, setIsPhotoPopupVisible] = useState(false);
  const flatlistRef = useRef();

  const addPhotoOptions = [
    ActionSheetOptions.openCamera,
    ActionSheetOptions.openGallery,
    ActionSheetOptions.cancel,
  ];

  function getActionSheetOptions() {
    return addPhotoOptions;
  }
  const options = getActionSheetOptions();

  function showAddButton() {
    if (!strictToCount) {
      return true;
    }
    return selectedPhotos.length < maxFilesCount + 1;
  }

  const addImageButtonAction = () => {
    if (maxFilesCount > 2) {
      console.log('clicked');
    } else {
      Keyboard.dismiss();
      setIsPhotoPopupVisible(
        selectedPhotos.length < maxFilesCount ? true : false,
      );
      if (selectedPhotos.length === maxFilesCount) {
        dispatch(
          showAppToast(true, `You can upload max of ${maxFilesCount} images.`),
        );
      }
      handleError(null, Input_Type.selectField);
    }
  };

  React.useEffect(() => {
    if (selectedPhotos.length < 4)
      flatlistRef?.current?.scrollToOffset({animated: true, offset: 0});
  }, [selectedPhotos]);

  return (
    <View style={styles.docsContainer}>
      <Text style={[styles.selectField]}>
        <Text style={styles.selectField}>{title}</Text>
        <Text style={{color: Colors.RED}}>*</Text>
      </Text>
      <FlatList
        ref={flatlistRef}
        horizontal
        data={selectedPhotos}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.localIdentifier}
        ListHeaderComponent={
          showAddButton() && (
            <TouchableOpacity
              style={[styles.addImageButton]}
              onPress={addImageButtonAction}>
              <Image source={Images.PLUS} resizeMode={'center'} />
            </TouchableOpacity>
          )
        }
        renderItem={({item: photo, index}) => (
          <View key={index} style={styles.photoView}>
            <Image
              key={index}
              style={styles.gallaryPhoto}
              source={{
                uri: photo?.path ? 'file://' + photo?.path : photo,
              }}
              resizeMode={'contain'}
            />
            <TouchableOpacity
              style={styles.crossIcon}
              onPress={() => {
                Keyboard.dismiss();
                selectedPhotos.splice(index, 1);
                setSelectedPhotos([...selectedPhotos]);
              }}>
              <Image source={Images.imageCross} />
            </TouchableOpacity>
          </View>
        )}
      />
      {error && (
        <Text style={[styles.errorText, {marginHorizontal: scaleWidth(30)}]}>
          {error ?? ''}
        </Text>
      )}
      <Text style={{paddingHorizontal: 40}}>
        <Text style={{color: Colors.RED}}>*</Text>
        <Text style={[styles.selectFieldDesc, styles.docText]}>{desc}</Text>
      </Text>
      {isPhotoPopupVisible && (
        <CustomImagePicker
          freeCrop={freecrop}
          isVisible={isPhotoPopupVisible}
          addPhotoOptions={options}
          multiple={false}
          showBottomContent
          maxFilesCount={maxFilesCount - selectedPhotos.length}
          cancelHandler={() => {
            setIsPhotoPopupVisible(false);
          }}
          handleMediaFile={images => {
            setIsPhotoPopupVisible(false);
            let errorMsg = '';
            const selectedImages = Array.isArray(images) ? images : [images];
            let validImages = [];
            selectedImages.forEach(image => {
              if (image?.size > validationBank.MAX_FILE_SIZE) {
                errorMsg = Strings.FILE_MAX_SIZE;
              } else if (!validateImage(image?.path)) {
                errorMsg = Strings.INVALID_FORMAT;
              } else {
                validImages.push(image);
              }
            });
            setSelectedPhotos([...selectedPhotos, ...validImages]);
            if (errorMsg != '') {
              dispatch(showAppToast(errorMsg));
            }
          }}
          cancelButtonIndex={options.length - 1}
        />
      )}
    </View>
  );
}
