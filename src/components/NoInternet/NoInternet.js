import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Strings} from '../../constants';
import Images from '../../constants/Images';
import style from './style';
const NoInternet = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={Images.no_internet} />
      <Text style={style.noInternetText}>{Strings.NO_INTERNET_CONNECTION}</Text>
      <Text style={style.bottomTextData}>{Strings.UNABLE_TO_SHOW_DATA}</Text>
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={style.retry}>
          <Text>{Strings.RETRY}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternet;
