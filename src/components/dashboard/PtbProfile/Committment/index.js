import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import styles from './style';
import { showAppToast } from '../../../../redux/actions/loader';

const Commitment = ({MainText, Months, Icon, Style, onPress,isSelected=false,isUpcoming=false,upcomingStarts=''}) => {
  const dispatch = useDispatch();
  const handleOnPress = ()=>{
    if(isSelected || isUpcoming){
      // dispatch(showAppToast(true,isSelected?"This plan is already active!":"This is your upcoming Plan."))
    }
    else{
      onPress();
    }
  }
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleOnPress}
        style={[styles.mainContainer, Style]}>
        <View style={styles.innerView}>
          <Text style={[styles.mainText,isSelected?{opacity: 0.4,}:null]}>{MainText}</Text>
          {/* <Text style={styles.innerText}>{Months}</Text> */}
        </View>
        {(!isSelected && !isUpcoming) && <View style={styles.iconContainer}>
          <Image style={styles.Icon} source={Icon} />
        </View>}
        {isSelected && <View style={styles.subscribeBtn}>
          <Text style={styles.subscribeTxt}>
            Current Plan
          </Text>
        </View>}
        {isUpcoming && <View style={styles.upComingBtn}>
          <Text style={styles.upComingTxt}>
            {`Selected Plan Starts from ${moment(upcomingStarts).format('LL')}`}
          </Text>
        </View>}
      </TouchableOpacity>
    </>
  );
};

export default Commitment;
