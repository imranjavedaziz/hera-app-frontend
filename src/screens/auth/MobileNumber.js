// MobileNumber
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import { showAppToast } from '../../redux/actions/loader';

const MobileNumber = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // React.useEffect(async()=>{
  //   await dispatch(showAppToast(true,'This is error message'));
  // },[])
  const [mobile, setMobile] = useState('');
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={globalStyle.screenTitle}>
          {Strings.mobile.AccountVerification}
        </Text>
        <View
          style={{marginVertical: 20}}
          accessible={true}
          accessibilityLabel={`${Strings.mobile.BeforProceed} ${Strings.mobile.VerifyNumber}`}>
          <Text
            style={globalStyle.screenSubTitle}
            numberOfLines={2}
            accessible={false}>
            {Strings.mobile.BeforProceed}
          </Text>
          <Text
            style={globalStyle.screenSubTitle}
            accessible={false}
            numberOfLines={1}>
            {Strings.mobile.VerifyNumber}
          </Text>
        </View>
        <View
          style={{
            flex: 0,
            width: '100%',
            flexDirection: 'row',
          }}>
          <FloatingLabelInput
            label={Strings.mobile.Code}
            value="+1"
            disabled={true}
            containerStyle={{
              width: 60,
              marginRight: 20,
            }}
          />
          <FloatingLabelInput
            label={Strings.mobile.MobileNumber}
            value={mobile}
            onChangeText={num => setMobile(num)}
            keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            fixed={true}
          />
        </View>
        <Button label={Strings.mobile.VERIFY} />
      </View>
    </Container>
  );
};
export default MobileNumber;
