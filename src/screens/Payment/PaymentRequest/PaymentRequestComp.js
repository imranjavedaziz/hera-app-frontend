import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Strings} from '../../../constants';
import styles from './styles';
import {useSelector} from 'react-redux';
import {MaterialIndicator} from 'react-native-indicators';
import {dynamicSize} from '../../../utils/responsive';

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
  } = props;
  const {log_in_data} = useSelector(state => state.Auth);
  const [imageLoading, setImageLoading] = useState(true);

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
              <>
                {imageLoading && (
                  <MaterialIndicator
                    color={Colors.COLOR_A3C6C4}
                    size={dynamicSize(20)}
                    style={styles.loader}
                  />
                )}
                <Image
                  style={styles.img}
                  resizeMode={'cover'}
                  source={{uri: DocImg}}
                  onLoadEnd={() => setImageLoading(false)}
                />
              </>
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
            source={Images.SuccessPayment}
          />
          <Text
            style={[{color: Colors.RED}, styles.TextStatusView]}>
            {Strings.SendAndRequest.Payment_Received}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PaymentRequestComp;
