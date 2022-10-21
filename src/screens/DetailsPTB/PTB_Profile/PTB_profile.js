import {
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Container from '../../../components/Container';
import {useNavigation, useRoute} from '@react-navigation/native';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';
import SetterData from '../../../services/SetterData';
import {useDispatch, useSelector} from 'react-redux';
import {getPtbProfileDetail} from '../../../redux/actions/PtbProfileDetail';
import {showAppLoader, hideAppLoader} from '../../../redux/actions/loader';
const PTB_profile = ({route}) => {
  const [stateRes, setStateRes] = useState();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const {
    get_ptb_profile_detail_success,
    get_ptb_profile_detail_loading,
    get_ptb_profile_detail_error_msg,
    get_ptb_profile_detail_res,
  } = useSelector(state => state.PtbProfileDetail);
  useEffect(() => {
    if (loadingRef.current && !get_ptb_profile_detail_loading) {
      dispatch(showAppLoader());
      if (get_ptb_profile_detail_success) {
        dispatch(hideAppLoader());
        setStateRes(get_ptb_profile_detail_res);
      }
      if (get_ptb_profile_detail_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_ptb_profile_detail_loading;
  }, [get_ptb_profile_detail_success, get_ptb_profile_detail_loading]);
  console.log('result', get_ptb_profile_detail_res);
  const {
    params: {userid},
  } = useRoute();
  useEffect(() => {
    dispatch(getPtbProfileDetail(userid));
  }, []);
  const navigation = useNavigation();
  const [sendReq, setSendReq] = useState(false);
  const [requestDecline, SetRequestDecline] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hi, sethi] = useState([]);

  const data = SetterData();
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  // useEffect(() => {
  //   data.ptbProfileDetail(route.params.userid);
  //    sethi(data.highlits);

  // }, []);

  return (
    <Container
      showHeader={true}
      headerEnd={false}
      headerComp={headerComp}
      style={{}}>
      <View>
        <View style={styles.location}>
          <Image source={Images.iconmapblue} />
          <Text style={styles.locationText}>{stateRes?.location?.name}</Text>
        </View>
        <Text style={styles.profileName}>{stateRes?.first_name}</Text>
        <Text style={styles.profileName}>{stateRes?.last_name}</Text>
        <View style={styles.profileImg}>
          <Image
            style={styles.profileLogo}
            source={{
              uri: stateRes?.profile_pic,
            }}
          />
        </View>
        <Text style={styles.profileType}>{Strings.PTB_Profile.type}</Text>
        <View style={styles.ageContainer}>
          <Text>Age: </Text>
          <Text style={styles.ageYrs}>
            {stateRes?.age}
            {Strings.PTB_Profile.yrs}
          </Text>
        </View>
        <View>
          <ImageBackground
            source={Images.QUOTES}
            style={styles.bioBackground}></ImageBackground>
          <Text style={styles.bioText}>{stateRes?.user_profile?.bio}</Text>
        </View>
        <View style={{flexDirection: Alignment.ROW}}>
          {/* {data.ptbProfileDetails?.user_profile?.map((item, i) => {
            return (
              <View key={i} style={styles.highlits}>
                <Text style={styles.highlitsText}>{item}</Text>
              </View>
            );
          })} */}
          <View style={{flexDirection: 'row'}}>
            {stateRes?.user_profile?.gender ? (
              <View style={styles.highlits}>
                <Text style={styles.highlitsText}>
                  {stateRes?.user_profile?.gender}
                </Text>
              </View>
            ) : null}
            {stateRes?.user_profile?.sexual_orientation ? (
              <View style={styles.highlits}>
                <Text style={styles.highlitsText}>
                  {stateRes?.user_profile?.sexual_orientation}
                </Text>
              </View>
            ) : null}
            {stateRes?.user_profile?.relationship_status ? (
              <View style={styles.highlits}>
                <Text style={styles.highlitsText}>
                  {stateRes?.user_profile?.relationship_status}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      {stateRes?.doner_video_gallery != null ? (
        <View>
          <Text style={styles.videoText}>{Strings.PTB_Profile.video_text}</Text>
          <Video
            controls={true}
            source={{uri: stateRes?.doner_video_gallery}}
            onError={err => console.log(err)}
            style={styles.videoContainer}
            paused={true}
          />
        </View>
      ) : null}
      {sendReq ? (
        <TouchableOpacity
          style={styles.reqSentBtn}
          onPress={() => console.log(sendReq)}>
          <Image source={Images.HEARTH_ICON} />
          <Text style={styles.reqsentText}>
            {Strings.PTB_Profile.request_sent}
          </Text>
        </TouchableOpacity>
      ) : requestDecline ? (
        <Pressable style={styles.declineReq}>
          <Image source={Images.RED_CROSS_ICON} />
          <Text style={styles.declineText}>
            {Strings.PTB_Profile.request_decline}
          </Text>
        </Pressable>
      ) : (
        <Pressable style={styles.sendMsgBtn} onPress={() => setSendReq(true)}>
          <Image source={liked ? Images.iconChat : Images.HEARTH_ICON} />
          <Text style={[styles.sendMsgText, {padding: liked ? 10 : 0}]}>
            {liked
              ? Strings.PTB_Profile.send_msg
              : Strings.PTB_Profile.send_request}
          </Text>
        </Pressable>
      )}
      {/* </View> */}
    </Container>
  );
};

export default PTB_profile;
