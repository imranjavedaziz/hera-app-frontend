import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {Alignment, Colors, Images, Strings} from '../constants';
import {Value} from '../constants/FixedValues';
import {Fonts} from '../constants/Constants';
import {dynamicSize, height} from '../utils/responsive';
import {MaterialIndicator} from 'react-native-indicators';
const styles = {
  container: {
    position: Alignment.ABSOLUTE,
    alignSelf: Alignment.CENTER,
    marginTop: height / 2.5,
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
};
const WebViewUrl = props => {
  const navigation = useNavigation();
  const INJECTED_JAVASCRIPT = `(function() {
      const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
    })();`;
  return (
    <>
      <View
        style={{
          alignItems: Alignment.CENTER,
          paddingVertical: Value.CONSTANT_VALUE_15,
          backgroundColor: Colors.BACKGROUND,
          flexDirection: Alignment.ROW,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: Alignment.CENTER,
            width: Value.CONSTANT_VALUE_40,
            alignItems: Alignment.CENTER,
            marginLeft: Value.CONSTANT_VALUE_10,
          }}
          onPress={navigation.goBack}>
          <Image source={Images.webIcon} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: Alignment.CENTER,
            alignItems: Alignment.CENTER,
            flex: Value.CONSTANT_VALUE_1,
            right: Value.CONSTANT_VALUE_20,
          }}>
          <Text
            style={{
              textAlign: Alignment.CENTER,
              fontFamily: Fonts.OpenSansBold,
              fontSize: Value.CONSTANT_VALUE_11,
              letterSpacing: Value.CONSTANT_VALUE_2_84,
              color: Colors.BLACK,
            }}>
            {props?.route?.params?.about
              ? Strings.smSetting.AboutUs.toUpperCase()
              : props?.route?.params?.terms
              ? Strings.Subscription.TermsServices.toUpperCase()
              : props?.route?.params?.policy
              ? Strings.smSetting.Privacy.toUpperCase()
              : ''}
          </Text>
        </View>
      </View>
      <WebView
        source={{uri: props?.route?.params?.url}}
        startInLoadingState
        injectedJavaScript={INJECTED_JAVASCRIPT}
        renderLoading={() => (
          <View style={styles.container}>
            <MaterialIndicator
              color={Colors.COLOR_A3C6C4}
              size={dynamicSize(25)}
            />
          </View>
        )}
        automaticallyAdjustContentInsets={true}
        allowsBackForwardNavigationGestures
      />
    </>
  );
};
export default WebViewUrl;
