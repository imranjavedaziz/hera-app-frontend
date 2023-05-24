import React, {useState} from 'react';
import {Image, View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Alignment, Colors} from '../../constants';
import {dynamicSize} from '../../utils/responsive';
import styles from './styles';
import {MaterialIndicator} from 'react-native-indicators';

const Loader = ({style = null}) => {
  return (
    <>
      <MaterialIndicator
        color={Colors.WHITE}
        size={dynamicSize(30)}
        style={styles.loaderImg}
      />
      <View style={styles.loaderView} />
    </>
  );
};

const AllMediaImg = props => {
  const [loading, setLoading] = useState(false);
  const {children = null, key, ...restProps} = props;

  const onLoadStart = () => {
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
  };

  return (
    <>
      <FastImage
        {...restProps}
        key={key}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}>
        {children}
      </FastImage>
      {loading && <Loader style={restProps.style} />}
    </>
  );
};

export default React.memo(AllMediaImg);
