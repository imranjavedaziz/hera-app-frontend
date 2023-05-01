import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {ModalMiddle} from '../../../../components';
import Header, {IconHeader} from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import AboutPayment from '../../../../components/AboutPayment/AboutPayment';
import PaymentComp from '../../../../components/PaymentComp/PaymentComp';
import {useSelector} from 'react-redux';
import {Routes} from '../../../../constants/Constants';
import PaymentCards from '../../../../components/PaymentCards/PaymentCards';
import {dynamicSize} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';

const HeraPay = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {log_in_data} = useSelector(state => state.Auth);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      rightIcon={Images.ICON_INFO}
      rightPress={() => setModal(!modal)}
      style={styles.headerIcon}
      iIcon={styles.iIcon}
    />
  );

  const backAction = () => {
    Alert.alert(
      Strings.Hera_Pay.Remove_Card,
      Strings.Hera_Pay.Remove_Card_Text,
      [
        {
          text: Strings.Hera_Pay.Yes_Remove,
        },
        {
          text: Strings.Hera_Pay.Not_Now,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.heraPay}>{Strings.Hera_Pay.HERA_PAY}</Text>
          <Text style={styles.sendPay}>
            {log_in_data?.role_id == 2
              ? Strings.Hera_Pay.Send_Payment
              : Strings.Hera_Pay.Request_for_Payment}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.MatchScreen);
            }}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>
              {log_in_data?.role_id == 2
                ? Strings.Hera_Pay.MAKE_PAYMENT
                : Strings.Hera_Pay.REQUEST_PAYMENT}
            </Text>
          </TouchableOpacity>
          <View style={styles.paymentReqContainer}>
            <PaymentComp
              onPress={() => {
                navigation.navigate(Routes.PaymentRequest);
              }}
              Icon={Images.MONEY_TRANSFER}
              Heading={
                log_in_data?.role_id == 2
                  ? Strings.Payment_Comp.See_Payment_Request
                  : Strings.Payment_Comp.Request_Sent_to_Parents
              }
              Content={
                log_in_data?.role_id == 2
                  ? Strings.Payment_Comp.Request_Description
                  : Strings.Payment_Comp.Parent_Description
              }
              Pending={
                log_in_data?.role_id == 2 &&
                Strings.Payment_Comp.Pending_Request
              }
              line
            />
          </View>
          <View style={styles.historyContainer}>
            <PaymentComp
              onPress={() => {
                navigation.navigate(Routes.Transaction);
              }}
              Icon={Images.TRANSACTION_HISTORY}
              Heading={Strings.Payment_Comp.Transaction_History}
              Content={
                log_in_data?.role_id == 2
                  ? Strings.Payment_Comp.History_Description
                  : Strings.Payment_Comp.Transaction_History_Parent
              }
              line
            />
          </View>
          <View style={styles.cerditCardContainer}>
            <PaymentComp
              payment
              Icon={
                log_in_data?.role_id == 2
                  ? Images.CREDIT_CARD
                  : Images.BANK_LOGO
              }
              Heading={
                log_in_data?.role_id == 2
                  ? Strings.Payment_Comp.Manage_Card
                  : Strings.Payment_Comp.Manage_Bank
              }
              Content={
                log_in_data?.role_id !== 2 &&
                Strings.Payment_Comp.Bank_Description
              }
            />
          </View>
          {log_in_data?.role_id === 2 && (
            <View style={{bottom: 20}}>
              <PaymentCards
                onPress={() => {
                  Platform.OS === 'ios' ? backAction() : setShowModal(true);
                }}
                Icon={Images.ICON_MASTER}
                Number={Strings.Hera_Pay.CARD_NUMBER}
                Time={Strings.Hera_Pay.CARD_TIME}
              />
            </View>
          )}
          {log_in_data?.role_id === 2 && (
            <View style={styles.pamentCard}>
              <PaymentCards
                onPress={() => {
                  Platform.OS === 'ios' ? backAction() : setShowModal(true);
                }}
                Icon={Images.VISA_CARD}
                Number={Strings.Hera_Pay.CARD_NUM_TWO}
                Time={Strings.Hera_Pay.CARD_TIME_TWO}
              />
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.addCardContainer,
              {
                marginTop:
                  log_in_data?.role_id == 2
                    ? dynamicSize(Value.CONSTANT_VALUE_25)
                    : dynamicSize(Value.CONSTANT_VALUE_6),
              },
            ]}>
            <Text style={styles.plus}>{Strings.Hera_Pay.ADD}</Text>
            <Text style={styles.addCardTxt}>
              {log_in_data?.role_id == 2
                ? Strings.Hera_Pay.ADD_CARD
                : Strings.Hera_Pay.Add_Bank}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {modal && (
        <CustomModal>
          <AboutPayment
            onPress={() => setModal(!modal)}
            paraOne={
              log_in_data?.role_id == 2
                ? Strings.About_Payment.para_one
                : Strings.About_Payment.Sm_Para_One
            }
            paraTwo={
              log_in_data?.role_id == 2
                ? Strings.About_Payment.para_Two
                : Strings.About_Payment.Sm_Para_Two
            }
            starPara={
              log_in_data?.role_id == 2
                ? Strings.About_Payment.star_para
                : Strings.About_Payment.Sm_Star_Para
            }
            Heading={
              log_in_data?.role_id == 2
                ? Strings.About_Payment.make_payment
                : Strings.About_Payment.Add_Your_Bank
            }
            paraThree={
              log_in_data?.role_id == 2
                ? Strings.About_Payment.para_Three
                : Strings.About_Payment.Sm_Para_Three
            }
          />
        </CustomModal>
      )}
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.Hera_Pay.Remove_Card}
        String_2={Strings.Hera_Pay.Remove_Card_Text}
        String_3={Strings.Hera_Pay.Yes_Remove}
        String_4={Strings.Hera_Pay.Not_Now}
        onPressNav={() => {
          setShowModal(false);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default React.memo(HeraPay);
