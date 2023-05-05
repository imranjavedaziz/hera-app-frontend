import React from 'react';
import {View, Platform} from 'react-native';
import {useKeyboard} from '../utils/useKeyboard';

function ExtraBottomView() {
  const keyboardHeight = useKeyboard();

  return (
    Platform.OS === 'android' && (
      <View style={{width: '100%', height: keyboardHeight}} />
    )
  );
}

export default React.memo(ExtraBottomView);
