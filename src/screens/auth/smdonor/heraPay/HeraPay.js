import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {Container, ModalMiddle} from '../../../../components';
import {IconHeader} from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import AboutPayment from '../../../../components/AboutPayment/AboutPayment';
import PaymentComp from '../../../../components/PaymentComp/PaymentComp';
import {useDispatch, useSelector} from 'react-redux';
import {Routes} from '../../../../constants/Constants';
import {
  GET_BANK_LIST,
  GET_CARD_LIST,
  getBankList,
  getCardList,
} from '../../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';

const HeraPay = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {log_in_data, stripe_customer_id} = useSelector(state => state.Auth);
  const {getBankListResponse} = useSelector(store => store.getBankList);
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const [Data, setData] = useState([]);
  useEffect(() => {
    if (log_in_data?.role_id == 2) {
      dispatch(getCardList(stripe_customer_id, 3));
    } else {
      dispatch(getBankList(stripe_customer_id, 3));
    }
  }, [dispatch]);

  useEffect(() => {
    if (getBankListResponse?.status === GET_BANK_LIST.START) {
      dispatch(showAppLoader());
    } else if (getBankListResponse?.status === GET_BANK_LIST.SUCCESS) {
      let info = getBankListResponse?.info;
      setData(info?.data);
      dispatch(hideAppLoader());
      console.log(info, 'getBankListResponse?.info');
    } else if (getBankListResponse?.status === GET_BANK_LIST.FAIL) {
      let error = getBankListResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(false, error));
    }
  }, [getBankListResponse]);
  useEffect(() => {
    if (getCardListResponse?.status === GET_CARD_LIST.START) {
      dispatch(showAppLoader());
    } else if (getCardListResponse?.status === GET_CARD_LIST.SUCCESS) {
      let info = getCardListResponse?.info;
      setData(info?.data);
      dispatch(hideAppLoader());
    } else if (getCardListResponse?.status === GET_CARD_LIST.FAIL) {
      let error = getCardListResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(false, error));
    }
  }, [getCardListResponse]);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.headerIcon}
      rightIcon={Images.I_BUTTON}
      rightPress={() => setModal(!modal)}
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
    <>
      <Container
        scroller={false}
        showHeader={true}
        headerComp={headerComp}
        mainStyle={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.heraPay}>{Strings.Hera_Pay.HERA_PAY}</Text>
            {log_in_data?.role_id == 2 ? (
              <Text style={styles.sendPay}>
                {Strings.Hera_Pay.Send_Payment}
              </Text>
            ) : (
              <Text style={styles.sendPay}>
                {Strings.Hera_Pay.Request_for_Payment}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.MatchScreen);
              }}
              style={styles.btnContainer}>
              {log_in_data?.role_id == 2 ? (
                <Text style={styles.btnText}>
                  {Strings.Hera_Pay.MAKE_PAYMENT}
                </Text>
              ) : (
                <Text style={styles.btnText}>
                  {Strings.Hera_Pay.REQUEST_PAYMENT}
                </Text>
              )}
            </TouchableOpacity>
            <View style={styles.paymentReqContainer}>
              {log_in_data?.role_id == 2 ? (
                <PaymentComp
                  onPress={() => {
                    navigation.navigate(Routes.PaymentRequest);
                  }}
                  Icon={Images.MONEY_TRANSFER}
                  Heading={Strings.Payment_Comp.See_Payment_Request}
                  Content={Strings.Payment_Comp.Request_Description}
                  Pending={Strings.Payment_Comp.Pending_Request}
                  line
                />
              ) : (
                <PaymentComp
                  onPress={() => {
                    navigation.navigate(Routes.PaymentRequest);
                  }}
                  Icon={Images.MONEY_TRANSFER}
                  Heading={Strings.Payment_Comp.Request_Sent_to_Parents}
                  Content={Strings.Payment_Comp.Parent_Description}
                  line
                />
              )}
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
              {log_in_data?.role_id == 2 ? (
                <PaymentComp
                  payment
                  Icon={Images.CREDIT_CARD}
                  Heading={Strings.Payment_Comp.Manage_Card}
                />
              ) : (
                <PaymentComp
                  payment
                  Icon={Images.BANK_LOGO}
                  Heading={Strings.Payment_Comp.Manage_Bank}
                  Content={Strings.Payment_Comp.Bank_Description}
                />
              )}
            </View>
            {log_in_data?.role_id == 2 ? (
              <View>
                <View style={styles.cardsContainer}>
                  <Image source={Images.ICON_MASTER} />
                  <View style={styles.cardsInner}>
                    <Text style={styles.cardNo}>
                      {Strings.Hera_Pay.CARD_NUMBER}
                    </Text>
                    <Text style={styles.cardTime}>
                      {Strings.Hera_Pay.CARD_TIME}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Platform.OS === 'ios' ? backAction() : setShowModal(true);
                    }}>
                    <Image source={Images.iconDarkMore} />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardsTwoContainer}>
                  <Image source={Images.VISA_LOGO} />
                  <View style={styles.cardsInner}>
                    <Text style={styles.cardNo}>
                      {Strings.Hera_Pay.CARD_NUM_TWO}
                    </Text>
                    <Text style={styles.cardTime}>
                      {Strings.Hera_Pay.CARD_TIME_TWO}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Platform.OS === 'ios' ? backAction() : setShowModal(true);
                    }}>
                    <Image source={Images.iconDarkMore} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Routes.ManageCard)}
                  style={styles.addCardContainer}>
                  <Text style={styles.plus}>{Strings.Hera_Pay.ADD}</Text>
                  <Text style={styles.addCardTxt}>
                    {Strings.Hera_Pay.ADD_CARD}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.ManageBank)}
                style={styles.addBankContainer}>
                <Text style={styles.plus}>{Strings.Hera_Pay.ADD}</Text>
                <Text style={styles.addCardTxt}>
                  {Strings.Hera_Pay.Add_Bank}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Container>
      {modal && (
        <CustomModal>
          <AboutPayment onPress={() => setModal(!modal)} />
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
    </>
  );
};

export default React.memo(HeraPay);
