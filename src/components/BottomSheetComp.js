// BottomSheetComp
import React, {useRef, useEffect} from 'react';
import {Modal, TouchableOpacity, Animated} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import global from '../styles/global';

const BottomSheetComp = props => {
  const {
    isOpen,
    setOpen,
    children,
    wrapperStyle,
    lineStyle,
    isComing = false,
  } = props;
  const panelRef = useRef(null);
  const searchBarAnim = useRef(new Animated.Value(400)).current;
  useEffect(() => {
    if (isOpen) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: 122330,
        duration: 400,
        // useNativeDriver: true,
      }).stop();
    }
  }, [isOpen]);
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      onRequestClose={() => {
        setOpen(false);
      }}
      style={[
        {
          flex: 1,
        },
      ]}
      transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpen(false)}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          {backgroundColor: isComing ? '#000000aa' : null},
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={global.modal}
        />
        <Animated.View
          style={{
            transform: [{translateY: searchBarAnim}],
            // height: '100%',
            width: '100%',
            // backgroundColor: 'red',
          }}>
          <BottomSheet
            wrapperStyle={wrapperStyle ? wrapperStyle : global.bottomSheet}
            lineStyle={lineStyle}
            isOpen={isOpen}
            // animationDuration={1000}
            ref={ref => (panelRef.current = ref)}
            sliderMinHeight={0}
            // animation={Easing.ease}
            onClose={() => {
              setOpen(false);
            }}
            outerContentStyle={global.outerContentStyle}
            innerContentStyle={global.innerContentStyle}>
            {children}
          </BottomSheet>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
export default BottomSheetComp;
