import React from 'react';
import {View, Text, Image} from 'react-native';
import {Alignment} from '../../constants';
import style from './styles';

const EmptySmDonor = props => {
  return (
    <View style={style.container}>
      <Image source={props?.image} style={style.chatImage} />
      <Text style={style.chatText}>{props?.title}</Text>
      <Text style={[style.chatText, {fontWeight: Alignment.BOLD}]}>
        {props?.midTitle}
      </Text>
    </View>
  );
};
export default React.memo(EmptySmDonor);
