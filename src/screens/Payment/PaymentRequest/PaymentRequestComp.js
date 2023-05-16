import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Images, Strings} from '../../../constants';
import styles from './styles';
import {useSelector} from 'react-redux';

const PaymentRequestComp = props => {
  const {
    pdf = false,
    DocImg,
    profileImage,
    mainText,
    amount,
    time,
    //ptb
    onPressMedia,
    OnPressDecline,
    OnPressPay,
    //sm
    PaymentStatus,
  } = props;
  const {log_in_data} = useSelector(state => state.Auth);
  function getPaymentStatusImage(paymentType) {
    if (paymentType !== undefined) {
      const PaymentTypeToImageMap = {
        2: Images.SuccessPayment,
        3: Images.RejectPayment,
        0: Images.PendingPayment,
        1: Images.PendingPayment,
        4: Images.RejectPayment,
        5: Images.RejectPayment,
        6: Images.RejectPayment,
      };
      return PaymentTypeToImageMap[paymentType] || Images.PendingPayment;
    }
  }
  function getPaymentStatusText(paymentType) {
    if (paymentType !== undefined) {
      const PaymentTypeToTextMap = {
        2: Strings.SendAndRequest.Payment_Received,
        3: Strings.SendAndRequest.Request_Declined,
        0: Strings.SendAndRequest.Not_Received_Yet,
        1: Strings.SendAndRequest.Not_Received_Yet,
        4: Strings.SendAndRequest.Request_Declined,
        5: Strings.SendAndRequest.Request_Declined,
        6: Strings.SendAndRequest.Request_Declined,
      };
      return (
        PaymentTypeToTextMap[paymentType] ||
        Strings.SendAndRequest.Not_Received_Yet
      );
    }
  }

  function getColor(paymentType) {
    if (paymentType === 1 || paymentType === 0) {
      return Colors.RED;
    } else if (paymentType === 2) {
      return Colors.COLOR_5ABCEC;
    } else {
      return Colors.RED;
    }
  }
  return (
    <View style={styles.comContainer}>
      <View style={styles.innerViewComp}>
        <View style={styles.profileViewComp}>
          <Image style={styles.profileImg} source={{uri: profileImage}} />
          <View style={styles.marginFromImg}>
            <Text style={styles.userRequestName}>{mainText}</Text>
            <Text style={styles.priceRequest}>{amount}</Text>
            <Text style={styles.timeRequest}>{time}</Text>
          </View>
        </View>
        {DocImg && (
          <TouchableOpacity style={styles.ImageView} onPress={onPressMedia}>
            <Image style={styles.BlueLink} source={Images.BlueLink} />
            {pdf ? (
              <Image
                style={styles.imgpdf}
                resizeMode={'center'}
                source={Images.PDF}
              />
            ) : (
              <Image
                style={styles.img}
                resizeMode={'cover'}
                source={{uri: DocImg}}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {log_in_data.role_id === 2 ? (
        <View style={styles.AcceptRejectBtn}>
          <TouchableOpacity
            style={styles.DeclinebtnContainer}
            onPress={OnPressDecline}>
            <Text style={styles.Decline}>{Strings.Match_Screen.Decline}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={OnPressPay}>
            <Text style={styles.pay}>{Strings.Match_Screen.Pay}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.StatusView}>
          <Image
            style={styles.ImageStatusView}
            source={getPaymentStatusImage(PaymentStatus)}
          />
          <Text
            style={[{color: getColor(PaymentStatus)}, styles.TextStatusView]}>
            {getPaymentStatusText(PaymentStatus)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PaymentRequestComp;
