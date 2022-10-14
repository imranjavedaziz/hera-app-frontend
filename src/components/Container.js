// Container
import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import Header from './Header';

const styles = {
  container: {flex: 1, marginHorizontal: 30, },
  safearea: {flex: 1, backgroundColor: Colors.BACKGROUND},
  flexMain:{flex:1,},
};
const Scroller = ({enabled, style, children,mainStyle, showsVerticalScrollIndicator}) => {
  console.log(mainStyle)
  if (enabled) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[{
          paddingTop: 57,
          // borderWidth:2
        },style]}
        style={mainStyle ?[styles.flexMain, style]:[styles.container, style]} >
        {children}
      </ScrollView>
    );
  }
  return <View  style={[styles.container, style]}>{children}</View>;
};
const Container = props => {
  const {
    children,
    scroller = true,
    showHeader = false,
    headerEnd = false,
    headerComp = null,
    style = {},
    safeAreViewStyle={},
    mainStyle=false,
    showsVerticalScrollIndicator=false
  } = props;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
       <SafeAreaView style={[styles.safearea, safeAreViewStyle]}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Scroller enabled={scroller} style={style} mainStyle={mainStyle} showsVerticalScrollIndicator={showsVerticalScrollIndicator} >
          {showHeader && <Header end={headerEnd}>{headerComp()}</Header>}
            {children}
          </Scroller>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
export default Container;