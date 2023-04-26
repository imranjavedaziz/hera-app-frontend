import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Container, ModalMiddle} from '../../../../components';
import {IconHeader} from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import AboutPayment from '../../../../components/AboutPayment/AboutPayment';
import PaymentComp from '../../../../components/PaymentComp/PaymentComp';
import {useSelector} from 'react-redux';

const HeraPay = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {log_in_data, user} = useSelector(state => state.Auth);

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
            <TouchableOpacity style={styles.btnContainer}>
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
                  Icon={Images.MONEY_TRANSFER}
                  Heading={Strings.Payment_Comp.See_Payment_Request}
                  Content={Strings.Payment_Comp.Request_Description}
                  Pending={Strings.Payment_Comp.Pending_Request}
                  line
                />
              ) : (
                <PaymentComp
                  Icon={Images.MONEY_TRANSFER}
                  Heading={Strings.Payment_Comp.Request_Sent_to_Parents}
                  Content={Strings.Payment_Comp.Parent_Description}
                  line
                />
              )}
            </View>
            <View style={styles.historyContainer}>
              {log_in_data?.role_id == 2 ? (
                <PaymentComp
                  Icon={Images.TRANSACTION_HISTORY}
                  Heading={Strings.Payment_Comp.Transaction_History}
                  Content={Strings.Payment_Comp.History_Description}
                  line
                />
              ) : (
                <PaymentComp
                  Icon={Images.TRANSACTION_HISTORY}
                  Heading={Strings.Payment_Comp.Transaction_History}
                  Content={Strings.Payment_Comp.Transaction_History_Parent}
                  line
                />
              )}
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
                <TouchableOpacity style={styles.addCardContainer}>
                <Text style={styles.plus}>
                  {Strings.Hera_Pay.ADD}
                </Text>
                  <Text style={styles.addCardTxt}>
                    {Strings.Hera_Pay.ADD_CARD}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.addBankContainer}>
                <Text style={styles.plus}>
                  {Strings.Hera_Pay.ADD}
                </Text>
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
