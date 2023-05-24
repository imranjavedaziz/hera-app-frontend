import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import styles from './style';

const Commitment = ({
  Style,
  onPress,
  interval,
  price,
  planId,
  upcomingPlanId,
  role,
  upcomingRole,
  isSelected = false,
  isUpcoming = false,
  upcomingStarts = '',
  index = 0,
}) => {
  const handleOnPress = ()=>{
    if(!(isSelected || isUpcoming)){
      onPress();
    }
  }
  return (
    <>
    {(!isSelected && !isUpcoming) && index=== 1 && (
      <View style={[styles.verticalBar,
        isSelected && styles.blueBackground,{width: 0.5}]}/>
    )}
    {index === 1 && isUpcoming && planId===upcomingPlanId && (
      <View
        style={[
          styles.verticalBar,
          isSelected && styles.blueBackground,
          isUpcoming && styles.redBackground,
        ]}
      />
    )}
    {isSelected && (!isUpcoming && planId!==upcomingPlanId && role!==upcomingRole) && index=== 1 && (
      <View style={[styles.verticalBar,
        isSelected && styles.blueBackground,]}/>
    )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleOnPress}
        style={[
          styles.mainContainer,
          Style,
          index === 0 ? styles.leftItem : styles.rightItem,
          isSelected && styles.blueBorder,
          isUpcoming && styles.redBorder,
        ]}>
        <View style={styles.innerView}>
          {isUpcoming && (
            <Text style={[styles.mainText, isSelected ? {opacity: 0.4} : null]}>
              {`$${price}/`}
              <Text style={{fontSize: 12}}>{interval}</Text>
            </Text>
          )}
          {!isUpcoming && (
            <Text style={[styles.mainText, isSelected ? {opacity: 0.4} : null]}>
              {`$${price.toFixed(2)}\n/`}
              <Text style={{fontSize: 12}}>{interval}</Text>
            </Text>
          )}
          {isUpcoming && (
            <View style={styles.upComingBtn}>
              <Text style={styles.upComingTxt}>
                {`Selected Plan Starts from ${moment(upcomingStarts).format(
                  'LL',
                )}`}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {isSelected && (
        <View
          style={[
            styles.absolutePlan,
            index === 0 ? styles.leftCurrent : styles.rightCurrent,
          ]}>
          <View style={styles.subscribeBtn}>
            <Text style={styles.subscribeTxt}>Current Plan</Text>
          </View>
        </View>
      )}
      {index === 0 && isUpcoming && planId===upcomingPlanId && (
        <View
          style={[
            styles.verticalBar,
            isSelected && styles.blueBackground,
            isUpcoming && styles.redBackground,
          ]}
        />
      )}
      {isSelected && (!isUpcoming && planId!==upcomingPlanId && role!==upcomingRole) && index=== 0 && (
        <View style={[styles.verticalBar,
          isSelected && styles.blueBackground,]}/>
      )}

      {(!isSelected && !isUpcoming) && index=== 0 && (
        <View style={[styles.verticalBar,
          isSelected && styles.blueBackground,{width: 0.5}]}/>
      )}
    </>
  );
};

export default Commitment;
