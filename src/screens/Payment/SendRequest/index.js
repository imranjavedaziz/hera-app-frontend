import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {sendRequestSchema} from '../../../constants/schemas';
import {FloatingLabelInput, ModalMiddle} from '../../../components';
import {Colors, Images, Strings} from '../../../constants';
import Header, {CircleBtn} from '../../../components/Header';
import Styles from './style';
import CustomImagePicker, {
  ActionSheetOptions,
} from '../../../components/Document/CustomImagePicker';
import {hideAppLoader, showAppToast} from '../../../redux/actions/loader';
import {Input_Type} from '../../../constants/Constants';
import {RequestDocumentUploadPayment} from '../../../redux/actions/DocumentUpload';
import {SendPaymentRequest} from '../../../redux/actions/PaymentRequest';
import {digitBeforeDecimal} from '../../../utils/commonFunction';
import {Value} from '../../../constants/FixedValues';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {dynamicSize} from '../../../utils/responsive';
import {MaterialIndicator} from 'react-native-indicators';

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
  const {
    request_document_upload_success,
    request_document_upload_res,
    request_document_upload_loading,
    request_document_upload_fail,
  } = useSelector(state => state.DocumentUpload);
  const [imageLoading, setImageLoading] = useState(true);
  const loadingRef = useRef(null);
  const params = route.params;
  let scrollRef = React.createRef();
  const LoadingRef = useRef(null);
  const {
    send_payment_request_success,
    send_payment_request_loading,
    send_payment_request_error_msg,
    send_payment_request_res,
    send_payment_request_fail,
  } = useSelector(state => state.PaymentRequest);
  const [isPhotoPopupVisible, setIsPhotoPopupVisible] = useState(false);
  const [fileType, setFileType] = useState('');
  const [errorsData, setErrors] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [valueDot, setValueDot] = React.useState('');
  const [file, setFile] = useState(null);
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    resolver: yupResolver(sendRequestSchema),
  });
  const handleBackButtonClick = () => {
    onGoBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isDirty]);
  useEffect(() => {
    if (LoadingRef.current && !send_payment_request_loading) {
      if (send_payment_request_success) {
        dispatch(hideAppLoader());
        navigation.goBack();
      }
      if (send_payment_request_fail) {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = send_payment_request_loading;
  }, [
    send_payment_request_success,
    send_payment_request_loading,
    send_payment_request_error_msg,
    send_payment_request_res,
    send_payment_request_fail,
    navigation,
    dispatch,
  ]);
  useEffect(() => {
    if (loadingRef.current && !request_document_upload_loading) {
      if (request_document_upload_success) {
        setValue('doc_url', request_document_upload_res.file_url);
        dispatch(hideAppLoader());
        setImageLoading(false);
      }
      if (request_document_upload_fail) {
        dispatch(hideAppLoader());
        setImageLoading(false);
      }
    }
    loadingRef.current = request_document_upload_loading;
  }, [
    request_document_upload_success,
    request_document_upload_fail,
    request_document_upload_loading,
    request_document_upload_res,
    dispatch,
  ]);
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
          style: 'destructive',
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
    if (valueDot.endsWith('.')) {
      dispatch(showAppToast(true, 'Please enter valid amount'));
    } else {
      const payload = {
        ...data,
        to_user_id: params.id,
      };
      if (!payload.doc_url) {
        payload.doc_url = '';
      }
      dispatch(SendPaymentRequest(payload));
    }
  };
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
        name: 'name',
        type: file.type,
        uri: file.uri,
      });
    if (file !== null) {
      setImageLoading(true);
      dispatch(RequestDocumentUploadPayment(reqData));
    }
  }, [file]);
  useEffect(() => {
    console.log('imageCross', file);
  }, [file]);

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
    <>
      <View style={Styles.flex}>
        <Header end={true}>{headerComp()}</Header>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          enableAutoAutomaticScroll={true}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}>
          <View style={Styles.androidMainContainer}>
            <Text style={Styles.title}>{Strings.SendRequest.title}</Text>
            <Text style={Styles.subtitle} numberOfLines={2}>
              {Strings.SendRequest.subtitle}
            </Text>
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
            <View
              style={{
                flex: 1,
                marginTop: 10,
                marginHorizontal: Value.CONSTANT_VALUE_15,
              }}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => {
                  const handleAmountChange = text => {
                    let txt =
                      text?.length > 0 && typeof text === 'string'
                        ? text.replace(/\s/g, '')
                        : '';
                    if (
                      text?.length === 0 ||
                      Number(text) === 0 ||
                      text === ','
                    ) {
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
                        setValueDot(v);
                        onChange(v.trim().split(',').join(''));
                      }}
                      required={true}
                      maxLength={7}
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
                      position: 'relative',
                    }}>
                    {imageLoading && (
                      <MaterialIndicator
                        color={Colors.WHITE}
                        size={dynamicSize(20)}
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                        }}
                      />
                    )}
                    <Image
                      source={
                        file.type === 'image/jpeg'
                          ? {uri: file.path}
                          : Images.PDF
                      }
                      resizeMode={
                        file.type !== 'image/jpeg' ? 'center' : 'cover'
                      }
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
              <KeyboardAvoidingView
                style={Styles.flex}
                keyboardVerticalOffset={40}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={request_document_upload_loading}
                  style={Styles.btnContainer}>
                  <Text style={Styles.btnText}>
                    {Strings.SendRequest.sendRequest}
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
                  uri: images.path,
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
      </View>
    </>
  );
};
export default SendRequest;
