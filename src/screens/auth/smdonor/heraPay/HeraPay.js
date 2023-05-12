import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  DELETE_CARD,
  GET_BANK_LIST,
  GET_CARD_LIST,
  deleteCard,
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
import {getAccountStatus} from '../../../../redux/actions/AccountStatus';
import {monthGet} from '../../../../utils/commonFunction';
import getKycStatusFunction from '../../../../utils/getkycStatusFunc';

const HeraPay = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef();
  const {log_in_data, stripe_customer_id, connected_acc_token} = useSelector(
    state => state.Auth,
  );
  const {getBankListResponse} = useSelector(store => store.getBankList);
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const {
    account_status_success,
    account_status_loading,
    account_status_error_msg,
    account_status_fail,
    account_status_res,
  } = useSelector(state => state.AccountStatus);
  const {deleteCardResponse} = useSelector(store => store.deleteCard);
  const [Data, setData] = useState([]);
  const [KycStatus, setKycStatus] = useState(null);
  const [KycUpdated, setKycUpdated] = useState(false);
  const [Item, setItem] = useState(null);
  useFocusEffect(
    useCallback(() => {
      if (!_.isEmpty(stripe_customer_id)) {
        if (log_in_data?.role_id === 2) {
          dispatch(getCardList(stripe_customer_id, 10));
        } else {
          dispatch(getBankList(connected_acc_token, 3));
          dispatch(getAccountStatus());
        }
      }
    }, [dispatch]),
  );
  //Get Account Status
  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !account_status_loading) {
        dispatch(showAppLoader());
        if (account_status_success) {
          if (account_status_res?.kyc_status == 'verified') {
            setKycUpdated(false);
          } else {
            setKycUpdated(true);
          }
          setKycStatus(account_status_res?.kyc_status);
          dispatch(hideAppLoader());
        }
        if (account_status_fail) {
          dispatch(hideAppLoader());

          dispatch(showAppToast(true, account_status_error_msg));
        }
        dispatch(hideAppLoader());
      }
      loadingRef.current = account_status_loading;
    }, [account_status_success, account_status_loading, account_status_res]),
  );
  //Get Bank List
  useEffect(() => {
    if (getBankListResponse?.status === GET_BANK_LIST.START) {
      dispatch(showAppLoader());
    } else if (getBankListResponse?.status === GET_BANK_LIST.SUCCESS) {
      let info = getBankListResponse?.info;
      setData(info?.data);
      dispatch(hideAppLoader());
    } else if (getBankListResponse?.status === GET_BANK_LIST.FAIL) {
      let error = getBankListResponse?.error ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, error));
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
    if (deleteCardResponse?.status === DELETE_CARD.START) {
      dispatch(showAppLoader());
    } else if (deleteCardResponse?.status === DELETE_CARD.SUCCESS) {
      let info = deleteCardResponse?.info;
      setData(info?.data);
      dispatch(hideAppLoader());
      dispatch(showAppToast(false, 'Card removed from profile!'));
      dispatch(getCardList(stripe_customer_id, 3));
      dispatch({type: DELETE_BANK.CLEAN});
      dispatch({type: DELETE_CARD.CLEAN});
    } else if (deleteCardResponse?.status === DELETE_CARD.FAIL) {
      let error = deleteCardResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, error));
      dispatch({type: DELETE_BANK.CLEAN});
      dispatch({type: DELETE_CARD.CLEAN});
    } else {
      dispatch(hideAppLoader());
    }
  }, [deleteCardResponse]);
  const OnDeleteBank = item => {
    dispatch(deleteCard(item));
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
        ? `Remove the card ending with ${Strings.Hera_Pay.CARD_DOT}${item?.card?.last4}`
        : `Your Existing bank ending with \n ${Strings.Hera_Pay.CARD_DOT}${item?.last4} will be removed and you will receive all the payments in the updated bank after your KYC is approved.`,
      [
        {
          text:
            log_in_data?.role_id === 2
              ? Strings.Hera_Pay.Yes_Remove
              : 'Yes, Change',
          onPress: () =>
            log_in_data?.role_id === 2
              ? OnDeleteBank(item)
              : navigation.navigate(Routes.ManageBank, {Item: item}),
        },
        {
          text: Strings.Hera_Pay.Not_Now,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  console.log(Item);
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
                _.isEmpty(Data) || Data === null
                  ? log_in_data?.role_id !== 2
                    ? Strings.Payment_Comp.Bank_Description
                    : Strings.Payment_Comp.CARD_Descriptiom
                  : ''
              }
              Data={
                log_in_data?.role_id !== 2 &&
                (!_.isEmpty(Data) || Data !== null) &&
                true
              }
              EmptyCard={log_in_data?.role_id === 2 && _.isEmpty(Data)}
              FilledCard={log_in_data?.role_id === 2 && !_.isEmpty(Data)}
            />
          </View>
          {((log_in_data?.role_id !== 2 && !_.isEmpty(Data)) ||
            Data !== null ||
            Data !== undefined) &&
            getBankListResponse?.info &&
            getBankListResponse?.info?.data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: Alignment.ROW,
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
                        paddingVertical: Value.CONSTANT_VALUE_2,
                      }}>
                      {item?.account_holder_name}
                    </Text>
                    {KycUpdated === true &&
                      KycStatus !== null &&
                      (getKycStatusFunction(account_status_res?.kyc_status) !==
                      Strings.Hera_Pay.KYC_PENDING ? (
                        <TouchableOpacity
                          style={{
                            flexDirection: Alignment.ROW,
                            alignItems: Alignment.CENTER,
                          }}
                          onPress={() => navigation.navigate(Routes.KycScreen)}>
                          <Text style={styles.kycprocess}>
                            {getKycStatusFunction(
                              account_status_res?.kyc_status,
                            )}
                          </Text>
                          <Image
                            style={{top: Value.CONSTANT_VALUE_1}}
                            source={Images.rightLogo}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.kycprocess}>
                          {getKycStatusFunction(account_status_res?.kyc_status)}
                        </Text>
                      ))}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setItem(item);
                      Platform.OS === 'ios'
                        ? backAction(item)
                        : setShowModal(true);
                    }}>
                    <Image source={Images.iconDarkMore} />
                  </TouchableOpacity>
                </View>
              );
            })}
          {/* Manage_Bank */}
          {((log_in_data?.role_id === 2 && !_.isEmpty(Data)) ||
            Data !== null ||
            Data !== undefined) &&
            getCardListResponse?.info &&
            getCardListResponse?.info?.data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={
                    index === 0
                      ? {
                          paddingBottom: dynamicSize(Value.CONSTANT_VALUE_15),
                        }
                      : {
                          paddingVertical: dynamicSize(Value.CONSTANT_VALUE_15),
                        }
                  }>
                  <PaymentCards
                    onPress={() => {
                      setItem(item);
                      Platform.OS === 'ios'
                        ? backAction(item)
                        : setShowModal(true);
                    }}
                    Icon={item?.card?.brand}
                    number={`${Strings.Hera_Pay.CARD_DOT}${item?.card?.last4}`}
                    Time={`${Strings.Hera_Pay.CARD_TIME} ${monthGet(
                      item?.card,
                    )} ${item?.card?.exp_year}`}
                  />
                </View>
              );
            })}
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
                      ? dynamicSize(Value.CONSTANT_VALUE_15)
                      : dynamicSize(Value.CONSTANT_VALUE_6),
                  marginLeft: dynamicSize(35),
                },
              ]}>
              <Text style={styles.addCardTxt}>
                {log_in_data?.role_id === 2
                  ? Strings.Hera_Pay.ADD_CARD
                  : Strings.Hera_Pay.Add_Bank}
              </Text>
            </TouchableOpacity>
          )}
          {!_.isEmpty(Data) &&
            getCardListResponse?.info?.data?.length >= 1 &&
            getCardListResponse?.info?.data?.length < 10 &&
            log_in_data?.role_id === 2 && (
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.ManageCard)}
                style={styles.addBtnView}>
                <Text style={styles.addCardTxt}>
                  {Strings.Hera_Pay.ADD_CARD}
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
            ? `Remove the card ending with ${Strings.Hera_Pay.CARD_DOT}${Item?.card?.last4}`
            : `Your Existing bank ending with ${Strings.Hera_Pay.CARD_DOT}${Item?.last4} will be removed and you will receive all the payments in the updated bank after your KYC is approved.`
        }
        String_3={
          log_in_data?.role_id === 2
            ? Strings.Hera_Pay.Yes_Remove
            : 'Yes, Change'
        }
        String_4={Strings.Hera_Pay.Not_Now}
        onPressNav={() => {
          log_in_data?.role_id === 2
            ? OnDeleteBank(Item)
            : navigation.navigate(Routes.ManageBank, {Item: Item});
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
