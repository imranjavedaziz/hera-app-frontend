// BottomSheetComp
import React, {useRef} from 'react';
import {Button, Modal, Platform, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {useActionSheet} from '@expo/react-native-action-sheet';

const BottomSheetComp = props => {
  const {showActionSheetWithOptions} = useActionSheet();
  const {isOpen, setOpen, children, wrapperStyle, lineStyle} = props;
  const panelRef = useRef(null);
  const onPressIos = () => {
    const options = ['Delete', 'Save', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 1:
            // Save
            break;

          case destructiveButtonIndex:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      },
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => {
        setOpen(false);
      }}
      transparent>
      {Platform.OS === 'ios' ? (
        <>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setOpen(false)}
            style={{flex: 1}}
          />
          <Button title="Menu" onPress={onPressIos} />
        </>
      ) : (
        <>
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
        </>
      )}
    </Modal>
  );
};
export default BottomSheetComp;
