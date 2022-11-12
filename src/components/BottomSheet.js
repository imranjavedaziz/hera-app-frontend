// BottomSheetComp
import React, {useRef} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import global from '../styles/global';

const BottomSheetComp = props => {
  const {isOpen, setOpen, children, wrapperStyle, lineStyle} = props;
  const panelRef = useRef(null);

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => {
        setOpen(false);
      }}
      transparent>
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={global.modal}
        />
        <BottomSheet
          wrapperStyle={wrapperStyle ? wrapperStyle : global.bottomSheet}
          lineStyle={lineStyle}
          isOpen={isOpen}
          ref={ref => (panelRef.current = ref)}
          sliderMinHeight={0}
          onClose={() => {
            setOpen(false);
          }}
          outerContentStyle={global.outerContentStyle}
          innerContentStyle={global.innerContentStyle}>
          {children}
        </BottomSheet>
      </>
    </Modal>
  );
};
export default BottomSheetComp;
