import React, {useState} from 'react';
import {Image, View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Alignment, Colors} from '../../constants';

const styles = StyleSheet.create({
  loader: {
    flex: 0,
    position: Alignment.ABSOLUTE,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'rgb(241,140,146)',
    zIndex : -1
  },
});
const Loader = ({style=null}) => {
  return (
    <View style={[...style, styles.loader]}>
      <ActivityIndicator color={Colors.PURE_WHITE}/>
    </View>
  );
};
const ImageLoading = props => {
  const [loading, setLoading] = useState(false);
  const {isFastImg = false, children = null, ...restProps} = props;
  if (isFastImg) {
    return (
      <>
        <FastImage
          {...restProps}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}>
          {children}
        </FastImage>
        {loading && <Loader style={restProps.style}/>}
      </>
    );
  }
  return (
    <>
      <Image
        {...restProps}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading && <Loader style={restProps.style} />}
    </>
  );
};
export default React.memo(ImageLoading);
