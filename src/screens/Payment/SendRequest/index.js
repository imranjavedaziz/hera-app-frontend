import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {sendRequestSchema} from '../../../constants/schemas';
import {Container, FloatingLabelInput, ModalMiddle} from '../../../components';
import {Colors, Images, Strings} from '../../../constants';
import {CircleBtn} from '../../../components/Header';
import Styles from './style';
import CustomImagePicker, {
  ActionSheetOptions,
} from '../../../components/Document/CustomImagePicker';
import {showAppToast} from '../../../redux/actions/loader';
import {Input_Type, Routes} from '../../../constants/Constants';
import {DocumentUploadPayment} from '../../../redux/actions/DocumentUpload';
import {SendPaymentRequest} from '../../../redux/actions/PaymentRequest';
import {getAccountStatus} from '../../../redux/actions/AccountStatus';
import {digitBeforeDecimal} from '../../../utils/commonFunction';

const options = [
  ActionSheetOptions.openCamera,
  ActionSheetOptions.openGallery,
  ActionSheetOptions.openDoc,
  ActionSheetOptions.cancel,
];

const SendRequest = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {log_in_data} = useSelector(state => state.Auth);
  const {account_status_success, account_status_res} = useSelector(
    state => state.AccountStatus,
  );
  const {
    document_upload_success,
    document_upload_res,
    document_upload_loading,
  } = useSelector(state => state.DocumentUpload);
  const params = route.params;
  console.log('params', params);
  const [isPhotoPopupVisible, setIsPhotoPopupVisible] = useState(false);
  const [fileType, setFileType] = useState('');
  const [errorsData, setErrors] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = useState(null);
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    resolver: yupResolver(sendRequestSchema),
  });

  const backAction = () => {
    Alert.alert(
      Strings.SendRequest.DiscardEdit,
      Strings.SendRequest.DiscardEditDisc,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const handleError = (error, input) => {
    console.log(error, input, 'error, input');
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const addImageButtonAction = () => {
    if (file === null) {
      Keyboard.dismiss();
      setIsPhotoPopupVisible(true);
      handleError(null, Input_Type.selectField);
    }
  };
  const onSubmit = data => {
    if (
      account_status_res.status ||
      (account_status_res.bank_account &&
        account_status_res.kyc_status === 'verified')
    ) {
      console.log('onSubmit', data);
      const payload = {
        ...data,
        to_user_id: params.id,
      };
      if (!payload.doc_url) {
        payload.doc_url = '';
      }
      dispatch(SendPaymentRequest(payload));
    } else if (
      account_status_res.bank_account === null ||
      account_status_res.bank_account === ''
    ) {
      navigation.navigate(Routes.ManageBank, {redirectTo: Routes.SendRequest});
    } else if (
      account_status_res.kyc_status === 'incomplete' ||
      account_status_res.kyc_status === 'unverified'
    ) {
      navigation.navigate(Routes.KycScreen, {redirectTo: Routes.SendRequest});
    } else {
      dispatch(showAppToast(true, 'KYC approval is pending.'));
    }
  };
  useEffect(() => {
    if (account_status_success) {
      console.log('account_status_res', JSON.stringify(account_status_res));
    }
  }, [account_status_success, account_status_res]);
  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect');
      dispatch(getAccountStatus());
    }, []),
  );
  const onGoBack = () => {
    if (!isDirty) {
      navigation.goBack();
    } else if (Platform.OS === 'ios') {
      backAction();
    } else {
      setShowModal(true);
    }
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => {
        onGoBack();
      }}
      accessibilityLabel={Strings.inqueryForm.LEFT_ARROW_BUTTON}
      Fixedstyle={Styles.header}
    />
  );
  useEffect(() => {
    const reqData = new FormData();
    file !== null &&
      reqData.append('file', {
        name: file.name,
        type: file.type,
        uri: file.uri,
      });
    file !== null && dispatch(DocumentUploadPayment(reqData));
  }, [file]);
  useEffect(() => {
    console.log('imageCross', file);
  }, [file]);
  useEffect(() => {
    if (document_upload_success) {
      setValue('doc_url', document_upload_res.file_url);
      console.log('document_upload_res', JSON.stringify(document_upload_res));
    }
  }, [document_upload_success, document_upload_loading, document_upload_res]);
  const conTwoDecDigit = digit => {
    let splits = digit.split('.');
    if (splits[0] == '') {
      return '0' + digit;
    } else {
      return splits.length >= 2
        ? digitBeforeDecimal(splits[0], false) +
            '.' +
            splits[1].substring(-1, 2)
        : digit;
    }
  };

  return (
    <Container
      mainStyle={false}
      scroller={true}
      showHeader={true}
      headerEnd={true}
      fixedHeader={true}
      headerComp={headerComp}
      safeAreViewStyle={{backgroundColor: Colors.BACKGROUND}}>
      <View style={Styles.androidMainContainer}>
        <Text style={Styles.title}>{Strings.SendRequest.title}</Text>
        <Text style={Styles.subtitle}>{Strings.SendRequest.subtitle}</Text>
        <View style={Styles.profileContainer}>
          <View style={Styles.profileBox}>
            <Image
              source={{uri: params?.profile_pic}}
              style={Styles.profileImg}
            />
            <Text style={Styles.profileName} numberOfLines={1}>
              {log_in_data.role_id === 2
                ? `#${params?.username}`
                : `${params?.first_name} ${params?.last_name}`}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 15, marginTop: 10}}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => {
              const handleAmountChange = text => {
                console.log('handleAmountChange', text);
                let txt =
                  text?.length > 0 && typeof text === 'string'
                    ? text.replace(/\s/g, '')
                    : '';
                if (text?.length === 0 || Number(text) === 0 || text === ',') {
                  txt = '';
                } else {
                  if (txt?.includes(',')) {
                    txt = txt?.replace(/,/g, '');
                  }
                  if (isNaN(txt)) {
                    txt = txt.replace(/\D/g, '');
                    onChange(value.replace(/\D/g, ''));
                  }
                  if (txt.includes('.')) {
                    txt = conTwoDecDigit(txt);
                  } else {
                    txt = digitBeforeDecimal(txt, false);
                  }
                }
                return txt;
              };
              return (
                <FloatingLabelInput
                  label={Strings.SendRequest.amountField}
                  value={handleAmountChange(value)}
                  onChangeText={v => {
                    onChange(v.trim().split(',').join(''));
                  }}
                  required={true}
                  maxLength={15}
                  error={errors && errors.amount?.message}
                  inputMode={'numeric'}
                  keyboardType={'numeric'}
                />
              );
            }}
            name="amount"
          />
          <Text style={Styles.uploadImgTxt}>
            {Strings.SendRequest.uploadImg}
          </Text>
          <TouchableOpacity
            style={Styles.selectImgContainer}
            onPress={addImageButtonAction}>
            {file === null && (
              <Image source={Images.PLUS} resizeMode={'center'} />
            )}
            {file != null && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#f7f5f0',
                  shadowColor: 'rgba(0, 0, 0, 0.06)',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowRadius: 18,
                  shadowOpacity: 1,
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    file.type === 'image/jpeg' ? {uri: file.path} : Images.PDF
                  }
                  resizeMode={file.type !== 'image/jpeg' && 'center'}
                  style={[Styles.Imgs]}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    zIndex: 1,
                  }}
                  onPress={() => {
                    setFile(null);
                    setValue('doc_url', null);
                  }}>
                  <Image
                    source={Images.imageCross}
                    style={{height: 29, width: 29, resizeMode: 'cover'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <Controller control={control} render={() => {}} name="doc_url" />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={document_upload_loading}
            style={Styles.btnContainer}>
            <Text style={Styles.btnText}>
              {Strings.SendRequest.sendRequest}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isPhotoPopupVisible && (
        <CustomImagePicker
          freeCrop={true}
          isVisible={isPhotoPopupVisible}
          addPhotoOptions={options}
          multiple={false}
          showBottomContent
          cancelHandler={() => {
            setIsPhotoPopupVisible(false);
          }}
          handleMediaFile={images => {
            setIsPhotoPopupVisible(false);
            if (images.hasOwnProperty('mime')) {
              setFileType(images.mime);
              setFile({
                size: images.size,
                type: images.mime,
                uri: images.sourceURL,
                name: images.filename,
                path: images.path,
                loading: false,
              });
            } else {
              setFileType(images.type);
              setFile({
                size: images.size,
                type: images.type,
                uri: images.uri,
                name: images.name,
                path: images.uri,
                loading: false,
              });
            }
          }}
          cancelButtonIndex={options.length - 1}
        />
      )}
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.SendRequest.DiscardEdit}
        String_2={Strings.SendRequest.DiscardEditDisc}
        String_3={Strings.profile.ModalOption1}
        String_4={Strings.profile.ModalOption2}
        onPressNav={() => {
          setShowModal(false);
          navigation.goBack();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </Container>
  );
};
export default SendRequest;
