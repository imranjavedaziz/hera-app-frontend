// BottomSheetComp
import React, {useRef} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';

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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpen(false)}
        style={{flex: 1}}
      />
      <BottomSheet
        wrapperStyle={wrapperStyle ? wrapperStyle : {borderRadius: 0}}
        lineStyle={lineStyle}
        isOpen={isOpen}
        ref={ref => (panelRef.current = ref)}
        sliderMinHeight={0}
        onClose={() => {
          setOpen(false);
        }}
        outerContentStyle={{
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        innerContentStyle={{
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        {children}
      </BottomSheet>
    </Modal>
  );
};
export default BottomSheetComp;
