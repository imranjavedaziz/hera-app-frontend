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
  container: {flex: 1, marginHorizontal: 20},
  safearea: {flex: 1, backgroundColor: Colors.BACKGROUND},
};
const Scroller = ({enabled, children}) => {
  if (enabled) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {children}
      </ScrollView>
    );
  }
  return <View style={styles.container}>{children}</View>;
};
const Container = (props) => {
  const {children, scroller = true,showHeader=false,headerEnd=false,headerComp=null} = props;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
      <SafeAreaView style={styles.safearea}>
        {
          showHeader && <Header end={headerEnd}>
            {headerComp()}
          </Header>
        }
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Scroller enabled={scroller}>{children}</Scroller>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
export default Container;
