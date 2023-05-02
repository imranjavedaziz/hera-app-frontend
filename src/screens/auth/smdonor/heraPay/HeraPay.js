import React, {useCallback, useEffect, useState} from 'react';
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
import {Alignment, Colors, Images, Strings} from '../../../../constants';
import styles from './style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import AboutPayment from '../../../../components/AboutPayment/AboutPayment';
import PaymentComp from '../../../../components/PaymentComp/PaymentComp';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts, Routes} from '../../../../constants/Constants';
import {
  DELETE_BANK,
  GET_BANK_LIST,
  GET_CARD_LIST,
  deleteBankOrCard,
  getBankList,
  getCardList,
} from '../../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import PaymentCards from '../../../../components/PaymentCards/PaymentCards';
import {dynamicSize} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';
import _ from 'lodash';

const HeraPay = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {log_in_data, stripe_customer_id} = useSelector(state => state.Auth);
  const {getBankListResponse} = useSelector(store => store.getBankList);
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const [Item, setItem] = useState(null);
  const {deleteBankOrCardResponse} = useSelector(
    store => store.deleteBankOrCard,
  );
  const [Data, setData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      if (!_.isEmpty(stripe_customer_id)) {
        if (log_in_data?.role_id === 2) {
          dispatch(getCardList(stripe_customer_id, 3));
        } else {
          dispatch(getBankList(stripe_customer_id, 3));
        }
      }
    }, [dispatch]),
  );
  //Get Bank List
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
  //Get Card List
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
  //Delete Bank or Card
  useEffect(() => {
    if (deleteBankOrCardResponse?.status === DELETE_BANK.START) {
      dispatch(showAppLoader());
    } else if (deleteBankOrCardResponse?.status === DELETE_BANK.SUCCESS) {
      let info = deleteBankOrCardResponse?.info;
      setData(info?.data);
      dispatch(hideAppLoader());
    } else if (deleteBankOrCardResponse?.status === DELETE_BANK.FAIL) {
      let error = deleteBankOrCardResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(false, error));
    } else {
      dispatch(hideAppLoader());
    }
  }, [deleteBankOrCardResponse]);
  const OnDeleteBank = item => {
    dispatch(deleteBankOrCard(item));
  };
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

  const backAction = item => {
    Alert.alert(
      log_in_data?.role_id === 2
        ? Strings.Hera_Pay.Remove_Card
        : Strings.Hera_Pay.Remove_Bank,
      log_in_data?.role_id === 2
        ? Strings.Hera_Pay.Remove_Card_Text
        : Strings.Hera_Pay.Remove_Bank_Text,
      [
        {
          text: Strings.Hera_Pay.Yes_Remove,
          onPress: () => OnDeleteBank(item),
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
            {log_in_data?.role_id === 2
              ? Strings.Hera_Pay.Send_Payment
              : Strings.Hera_Pay.Request_for_Payment}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.MatchScreen);
            }}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>
              {log_in_data?.role_id === 2
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
                log_in_data?.role_id === 2
                  ? Strings.Payment_Comp.See_Payment_Request
                  : Strings.Payment_Comp.Request_Sent_to_Parents
              }
              Content={
                log_in_data?.role_id === 2
                  ? Strings.Payment_Comp.Request_Description
                  : Strings.Payment_Comp.Parent_Description
              }
              Pending={
                log_in_data?.role_id === 2 &&
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
                log_in_data?.role_id === 2
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
                log_in_data?.role_id === 2
                  ? Images.CREDIT_CARD
                  : Images.BANK_LOGO
              }
              Heading={
                log_in_data?.role_id === 2
                  ? Strings.Payment_Comp.Manage_Card
                  : Strings.Payment_Comp.Manage_Bank
              }
              Content={
                log_in_data?.role_id !== 2 &&
                (_.isEmpty(Data) || Data === null) &&
                Strings.Payment_Comp.Bank_Description
              }
              Data={
                log_in_data?.role_id !== 2 &&
                (!_.isEmpty(Data) || Data !== null) &&
                true
              }
            />
          </View>
          {((log_in_data?.role_id !== 2 && !_.isEmpty(Data)) ||
            Data !== null ||
            Data !== undefined) &&
            getBankListResponse?.info?.data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: Alignment.ROW,
                    alignItems: Alignment.CENTER,
                    justifyContent: Alignment.SPACE_BETWEEN,
                    paddingHorizontal: Value.CONSTANT_VALUE_5,
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: Alignment.ROW,
                        alignItems: Alignment.CENTER,
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansBold,
                          fontSize: Value.CONSTANT_VALUE_16,
                          color: Colors.BLACK,
                        }}>{`${Strings.Hera_Pay.CARD_DOT}${item?.last4}`}</Text>
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansRegular,
                          fontSize: Value.CONSTANT_VALUE_16,
                          color: Colors.BLACK,
                        }}>
                        {' '}
                        ({item?.bank_name})
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansRegular,
                        fontSize: Value.CONSTANT_VALUE_14,
                        color: Colors.BLACK,
                      }}>
                      {item?.account_holder_name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Platform.OS === 'ios'
                        ? backAction(item)
                        : setShowModal(true);
                      setItem(item);
                    }}>
                    <Image
                      style={{bottom: Value.CONSTANT_VALUE_5}}
                      source={Images.iconDarkMore}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
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
          {(_.isEmpty(Data) || Data === null) && (
            <TouchableOpacity
              onPress={() =>
                log_in_data?.role_id === 2
                  ? navigation.navigate(Routes.ManageCard)
                  : navigation.navigate(Routes.ManageBank)
              }
              style={[
                styles.addCardContainer,
                {
                  marginTop:
                    log_in_data?.role_id === 2
                      ? dynamicSize(Value.CONSTANT_VALUE_25)
                      : dynamicSize(Value.CONSTANT_VALUE_6),
                },
              ]}>
              <Text style={styles.plus}>{Strings.Hera_Pay.ADD}</Text>
              <Text style={styles.addCardTxt}>
                {log_in_data?.role_id === 2
                  ? Strings.Hera_Pay.ADD_CARD
                  : Strings.Hera_Pay.Add_Bank}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {modal && (
        <CustomModal>
          <AboutPayment
            onPress={() => setModal(!modal)}
            paraOne={
              log_in_data?.role_id === 2
                ? Strings.About_Payment.para_one
                : Strings.About_Payment.Sm_Para_One
            }
            paraTwo={
              log_in_data?.role_id === 2
                ? Strings.About_Payment.para_Two
                : Strings.About_Payment.Sm_Para_Two
            }
            starPara={
              log_in_data?.role_id === 2
                ? Strings.About_Payment.star_para
                : Strings.About_Payment.Sm_Star_Para
            }
            Heading={
              log_in_data?.role_id === 2
                ? Strings.About_Payment.make_payment
                : Strings.About_Payment.Add_Your_Bank
            }
            paraThree={
              log_in_data?.role_id === 2
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
        String_1={
          log_in_data?.role_id === 2
            ? Strings.Hera_Pay.Remove_Card
            : Strings.Hera_Pay.Remove_Bank
        }
        String_2={
          log_in_data?.role_id === 2
            ? Strings.Hera_Pay.Remove_Card_Text
            : Strings.Hera_Pay.Remove_Bank_Text
        }
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
