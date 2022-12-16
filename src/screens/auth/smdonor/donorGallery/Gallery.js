//Donor gallery
import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';

import ImageView from 'react-native-image-viewing';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../../components';
import {Strings} from '../../../../constants';

const images = [];
const Gallery = () => {
  const [visible, setIsVisible] = useState(false);
  let actionSheet = useRef();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ActionSheet
        ref={actionSheet}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
      />
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
      <ImageView
        images={images}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};
export default React.memo(Gallery);
