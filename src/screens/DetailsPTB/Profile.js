// Parent to Be Screen
import React, {useState, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Header, {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import {FormKey} from '../../constants/Constants';
import Strings from '../../constants/Strings';
import {Value} from '../../constants/FixedValues';
import {parentRegisterSchema} from '../../constants/schemas';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import styles from './StylesProfile';
import ActionSheet from 'react-native-actionsheet';
import Alignment from '../../constants/Alignment';
import {BottomSheetComp} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Profile = props => {
  const [check, setCheck] = useState(true);
  const [isOpen, setOpen] = useState(false);
  let actionSheet = useRef();
  const inputRef = useRef(null);
  const {
    control,
    formState: {errors},
  } = useForm({resolver: yupResolver(parentRegisterSchema)});

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      Fixedstyle={{
        marginRight: Value.CONSTANT_VALUE_20,
      }}
      accessibilityLabel={Strings.PTB_Profile.Cross_Button}
    />
  );
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView style={styles.flex}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.innerView}>
              <View style={styles.imgContainer}>
                <Text style={globalStyle.screenTitle}>
                  {Strings.profile.makeAccountFor}
                </Text>
                <View
                  accessible={true}
                  accessibilityLabel={`${Strings.profile.parentToBe}`}>
                  <Text
                    style={globalStyle.screenSubTitle}
                    numberOfLines={2}
                    accessible={false}>
                    {Strings.profile.parentToBe}
                  </Text>
                </View>
                <Text style={styles.ImageText}>
                  {Strings.profile.uploadImage}
                  <Text style={[styles.label, {color: Colors.RED}]}>*</Text>
                </Text>
              </View>
              <View style={styles.fullWidth}>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.FirstName}
                      value={value}
                      required={true}
                      maxLength={30}
                      inputRef={inputRef}
                      error={errors && errors.first_name?.message}
                    />
                  )}
                  name={FormKey.first_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.MiddleName}
                      value={value}
                      fontWeight={Alignment.BOLD}
                      error={errors && errors.middle_name?.message}
                      maxLength={30}
                      inputRef={inputRef}
                    />
                  )}
                  name={FormKey.middle_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.LastName}
                      value={value}
                      fontWeight={Alignment.BOLD}
                      required={true}
                      maxLength={30}
                      error={errors && errors.last_name?.message}
                      inputRef={inputRef}
                    />
                  )}
                  name={FormKey.last_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.EmailAddress}
                      value={value}
                      fontWeight={Alignment.BOLD}
                      required={true}
                      inputRef={inputRef}
                      error={errors && errors.email?.message}
                    />
                  )}
                  name={FormKey.email}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View>
                      <FloatingLabelInput
                        label={Strings.profile.setPassword}
                        value={value}
                        required={true}
                        secureTextEntry={true}
                        inputRef={inputRef}
                        containerStyle={{
                          marginBottom: Value.CONSTANT_VALUE_10,
                        }}
                      />
                    </View>
                  )}
                  name={FormKey.set_password}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.confirmPassword}
                      value={value}
                      required={true}
                      secureTextEntry={true}
                      inputRef={inputRef}
                      containerStyle={{marginBottom: Value.CONSTANT_VALUE_40}}
                      error={errors && errors.confirm_password?.message}
                    />
                  )}
                  name={FormKey.confirm_password}
                />
                <View style={[styles.tmc]}>
                  <View style={styles.rowContainer}>
                    {check ? (
                      <Pressable
                        onPress={() => {
                          setCheck(cur => !cur);
                        }}>
                        <Image source={Images.rectangleCopy} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => {
                          setCheck(cur => !cur);
                        }}>
                        <Image source={Images.iconCheck} />
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
              <ActionSheet
                ref={actionSheet}
                destructiveButtonIndex={2}
                cancelButtonIndex={2}
              />
              <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
                <View style={styles.imgPickerContainer}>
                  <TouchableOpacity
                    style={[styles.pickerBtn, styles.pickerBtnBorder]}>
                    <Text style={styles.pickerBtnLabel}>
                      {Strings.sm_create_gallery.bottomSheetCamera}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pickerBtn}>
                    <Text style={styles.pickerBtnLabel}>
                      {Strings.sm_create_gallery.bottomSheetGallery}
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheetComp>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default React.memo(Profile);
