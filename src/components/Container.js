// Container
import React from 'react';
import {View, StatusBar, SafeAreaView, Platform} from 'react-native';
import Colors from '../constants/Colors';
import Header from './Header';

const Container = props => {
  const {
    profileLoad = false,
    headerEnd = false,
    headerComp = null,
    fixedHeader = false,
  } = props;
  const PADDING_CON = Platform.OS === 'ios' ? 'padding' : 'height';
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
      {!profileLoad && (
        <SafeAreaView>
          <View behavior={PADDING_CON}>
            {fixedHeader && (
              <>
                <Header end={headerEnd}>{headerComp()}</Header>
              </>
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default Container;
