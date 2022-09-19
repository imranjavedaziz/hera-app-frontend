import { StyleSheet, Text, View } from 'react-native'
import React,{useCallback, useState} from 'react'
import {Slider} from '@miblanchard/react-native-slider';

import Colors from '../../constants/Colors';




const Range = ({value, setValue}) => {

  // const renderThumb = useCallback(() => <Thumb/>, []);
  // const renderRail = useCallback(() => <Rail/>, []);
  // const renderRailSelected = useCallback(() => <RailSelected/>, []);
  // const renderLabel = useCallback(value => <Label text={value}/>, []);
  // const renderNotch = useCallback(() => <Notch/>, []);
  // const handleValueChange = useCallback((low, high) => {
  //   setLow(low);
  //   setHigh(high);
  // }, []);

  // const [value,setValue] = useState([4.0,19.0]);

  const slide =({})=>{
    console.log(value);
  }
  return (
    // <View style={{flex: 1, flexDirection: 'row'}}>
    //   <Text>My range</Text>
  // </View>
  <View style={styles.container}>
  <Slider
    //  animateTransitions
    containerStyle={{}}
     maximumTrackTintColor= {Colors.INPUT_BORDER}
     maximumValue={7.0}
     minimumTrackTintColor={Colors.SKY_BLUE}
     minimumValue={4.9}
     step={0.1}
     thumbTintColor={Colors.SKY_BLUE}
     thumbStyle={{height:35,width:35, borderRadius:40, borderColor:Colors.BACKGROUND , borderWidth:3}}
    //  thumbTouchSize={{height:80,width:80}}
      value={value}
      onValueChange={value => setValue(value)}
      onSlidingComplete={slide}
  />
  {/* <Text>Value: { (value[1])}</Text> */}
</View>
  )
}

export default Range;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
},
})