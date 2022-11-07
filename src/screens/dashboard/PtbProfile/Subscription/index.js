import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/Container';
import Images from '../../../../constants/Images';
import Button from '../../../../components/Button';
import Strings from '../../../../constants/Strings';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Commitment from '../../../../components/dashboard/PtbProfile/Committment';
import { ScrollView } from 'react-native-gesture-handler';

const Subscription = () => {
  const navigation = useNavigation();
  const [halfYear, setHalfYear] = useState(false);
  const [fullYear, setFullYear] = useState(false);
  const headerComp = () => (
    <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
      <Text style={styles.headerText}>{Strings.Subscription.Later}</Text>
    </TouchableOpacity>
  );
  const onSubsribe = () => {
    console.log('presss');
  };
  const onChangeHalf = () => {
    setHalfYear(true);
    setFullYear(false);
  };
  const onChangeFull = () => {
    setHalfYear(false);
    setFullYear(true);
  };

  return (
    <Container
      scroller={false}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Image source={Images.LOGO} style={styles.logo} />
        <TitleComp
          Title={Strings.subscribe.Subscribe_Now}
          Subtitle={Strings.Subscription.SubHeader}
          Midtitle={Strings.Subscription.MidHeader}
          isCenter={true}
        />
        <View style={styles.innerContainer}>
          <Commitment
            MainText={Strings.Subscription.Price}
            Months={Strings.Subscription.Commitment}
            Icon={
              halfYear === true ? Images.iconRadiosel : Images.iconRadiounsel
            }
            Style={halfYear === true && styles.box}
            onPress={() => onChangeHalf()}
          />
          <Commitment
            MainText={Strings.Subscription.yearPrice}
            Months={Strings.Subscription.YearCommitment}
            Icon={
              fullYear === true ? Images.iconRadiosel : Images.iconRadiounsel
            }
            Style={fullYear === true && styles.box}
            onPress={() => onChangeFull()}
          />
        </View>
        <Button
          label={Strings.Subscription.SubscribeButton}
          style={styles.payButton}
          onPress={() => onSubsribe()}
        />
        <View>
          <View style={styles.textView}>
            <Text style={styles.mainText}>
            <Text style={{color:'red'}}>*</Text>{Strings.Subscription.BySubs}
              <TouchableOpacity style={{ top: 2,}}>
                <Text style={styles.terms}>
                  {Strings.Subscription.TermsServices}
                </Text>
              </TouchableOpacity>
              {Strings.Subscription.And}
              <TouchableOpacity>
                <Text style={styles.terms}>
                  {Strings.Subscription.PrivacyPolicy}
                </Text>
              </TouchableOpacity>
              {Strings.Subscription.SubscribePolicy}
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </Container>
  );
};

export default Subscription;
