// Toast
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';

import {Alignment, Colors, Images} from '../../constants';
import {Fonts, Routes} from '../../constants/Constants';
import {Prencentage, Value} from '../../constants/FixedValues';
import {hideMessageAppToast} from '../../redux/actions/loader';

const styles = {
  container: {
    position: Alignment.ABSOLUTE,
    top: -10,
    width: Prencentage.PRECENTAGE_100,
  },
  safe: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    width: Prencentage.PRECENTAGE_100,
  },
  row: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_20,
    width: Prencentage.PRECENTAGE_100,
    paddingLeft: Value.CONSTANT_VALUE_30,
    paddingRight: Value.CONSTANT_VALUE_40,
  },
  text: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.WHITE,
    marginLeft: Value.CONSTANT_VALUE_12,
  },
  bar: {
    width: Value.CONSTANT_VALUE_20,
    height: Value.CONSTANT_VALUE_5,
    backgroundColor: Colors.WHITE,
    opacity: 0.4,
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_3,
  },
};

const MessageToast = ({message}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const toastState = useSelector(state => state.loader);
  const backgroundColor =
    toastState?.pushRes?.notify_type === 'subscribe'
      ? Colors.COLOR_RED
      : Colors.GREEN;
  const push =
    toastState?.pushRes?.notify_type === 'chat'
      ? Images.groupMessage
      : toastState?.pushRes?.notify_type === 'profile'
      ? Images.groupLike
      : Images.warning;
  const type =
    toastState?.pushRes?.notify_type === 'chat' ? 'New Message' : 'New Request';
  React.useEffect(() => {
    if (toastState.showToast) {
      setTimeout(dispatch(hideMessageAppToast()), 5000);
    }
  }, [toastState.showToast]);
  const NavigationThreads = () => {
    if (toastState?.pushRes?.notify_type === 'profile') {
      const {status} = JSON.parse(toastState?.pushRes?.match_request);
      if (status === 2) {
        toastState?.navigation.navigate(Routes.ChatDetail, {
          item: toastState?.pushRes,
          isComingFrom: false,
          chatPush: true,
        });
      } else {
        toastState?.navigation.navigate(Routes.Chat_Request, {
          item: toastState?.pushRes,
          user: toastState?.pushRes?.match_request,
          chatPush: true,
        });
      }
    }
    if (toastState?.pushRes?.notify_type === 'chat') {
      const popAction = StackActions.replace('ChatDetail', {
        item: toastState?.pushRes,
        isComingFrom: false,
        chatPush: true,
      });
      toastState?.navigation.dispatch(popAction);
      toast.hide();
    }
    if (toastState?.pushRes?.notify_type === 'subscribe') {
      toastState?.navigation.navigate(Routes.PtbProfile);
    }
    if (
      toastState?.pushRes?.notify_type === 'payment_request' ||
      toastState?.pushRes?.notify_type === 'payment_declined'
    ) {
      const popAction = StackActions.replace(Routes.PaymentRequest);
      toastState?.navigation.dispatch(popAction);
      toast.hide();
    }
    if (toastState?.pushRes?.notify_type === 'payment_transfer') {
      toastState?.navigation.navigate(Routes.Transaction);
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
        animated={true}
        hidden={false}
      />
      <SafeAreaView style={styles.safe}>
        <Pressable style={styles.safe} onPress={() => toast.hide()}>
          <View style={styles.row}>
            <Image
              source={push}
              style={
                toastState?.toastMessageText.length > 10
                  ? {
                      alignItems: Alignment.CENTER,
                      justifyContent: Alignment.CENTER,
                      marginTop: Value.CONSTANT_VALUE_2,
                    }
                  : {
                      alignItems: Alignment.CENTER,
                      justifyContent: Alignment.CENTER,
                      marginTop: Value.CONSTANT_VALUE_5,
                    }
              }
            />
            <TouchableOpacity
              onPress={() => {
                NavigationThreads();
              }}>
              {(toastState?.pushRes?.notify_type === 'chat' ||
                toastState?.pushRes?.notify_type === 'profile') && (
                <Text style={styles.text}>{type}</Text>
              )}
              <Text style={styles.text}>{toastState.toastMessageText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bar} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};
export default MessageToast;
