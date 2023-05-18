import {Text, View, TouchableOpacity, Image, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import {Colors, Images, Strings} from '../../../../constants';
import {toggleNotification} from '../../../../redux/actions/Edit_profile';

const PtbAccount = ({leftIcon, title, onPress, BlueDot, RedDot, Pending}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContent}>
          <Image source={leftIcon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {BlueDot && <View style={styles.blueDot} />}
      {RedDot && (
        <View style={styles.innerView}>
          <View style={styles.reddot} />
          <Text style={styles.pending}>{Pending}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export const ToggleNotification = () => {
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const notification = useSelector(
    state => state.Edit_profile.get_user_detail_res?.notification_setting,
  );
  const user = useSelector(state => state.Auth.user);

  const [switchValue, setSwitchValue] = useState(
    Boolean(notification?.notify_status),
  );
  const toggleSwitch = () => {
    setChanged(true);
    setSwitchValue(old => !old);
  };
  useEffect(() => {
    setSwitchValue(Boolean(notification?.notify_status));
  }, [notification]);
  useEffect(() => {
    if (Boolean(notification?.notify_status) !== switchValue && changed) {
      setChanged(false);
      dispatch(toggleNotification({notify_status: switchValue}));
    }
  }, [switchValue, notification]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.row, {flex: 1}]}>
            <View style={styles.iconContent}>
              <Image source={Images.notification} />
            </View>
            <Text style={styles.title}>{Strings.PTB_Profile.ReceiveNoti}</Text>
          </View>
          <Switch
            style={{left: 7}}
            value={switchValue}
            onValueChange={toggleSwitch}
            trackColor={{true: '#5abdec'}}
            thumbColor={'white'}
          />
        </View>
      </View>
      <Text style={[styles.toggle, {marginLeft: 33, marginTop: 5}]}>
        <Text style={{color:  Colors.RED}}>*</Text>
        {user?.role_id === 2
          ? Strings.PTB_Profile.ReceiveNotiDesc
          : Strings.PTB_Profile.ReceiveNotiDescSM}
      </Text>
    </>
  );
};
export default PtbAccount;
