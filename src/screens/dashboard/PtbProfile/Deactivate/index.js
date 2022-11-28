import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {Value} from '../../../../constants/FixedValues';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const DeactivateAccount = () => {
  const navigation = useNavigation();
  const {control} = useForm({
    resolver: yupResolver(),
  });
  const headerComp = () => (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );

  const Reasons = [
    {
      id: 1,
      first: 'I have a privacy concern',
    },
    {
      id: 2,
      first: 'I have created another account and don’t need this one',
    },
    {
      id: 3,
      first: 'Cannot find right matches',
    },
    {
      id: 4,
      first: 'This is temporary, I’ll be back',
    },
    {
      id: 5,
      first: 'I find it distracting and takes away too much of my time.',
    },
    {
      id: 6,
      first: 'I don’t understand how it works',
    },
  ];

  return (
    <View style={styles.upperContainer}>
      <Header end={true}>{headerComp()}</Header>
      <ScrollView showVerticalIndicatot={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.AccountVerify}>
              {Strings.Settings.Deactivate_Account}
            </Text>
          </View>
          <View style={styles.innerHeading}>
            <Text style={styles.setANew}>{Strings.Settings.Select_Reason}</Text>
          </View>
          <View style={styles.flex}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.flex}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.fullWidth}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <View style={styles.radioContainer}>
                        {Reasons.map(item => (
                          <TouchableOpacity
                            onPress={() => onChange(item.id)}
                            style={styles.radioBtn}>
                            <Image
                              style={styles.radioImg}
                              source={
                                value === item.id
                                  ? Images.iconRadiosel
                                  : Images.iconRadiounsel
                              }
                            />
                            <Text style={styles.radioLabel}>{item.first}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    name="reasons"
                  />
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.dashboardBtn}>
              <Text
                style={styles.buttonText}
                accessible={false}
                numberOfLines={Value.CONSTANT_VALUE_1}>
                {Strings.Settings.DEACTIVATE_MY_ACCOUNT}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeactivateAccount;
