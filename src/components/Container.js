// Container
import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import Header from './Header';
import {Value} from '../constants/FixedValues';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const styles = {
  container: {
    flex: Value.CONSTANT_VALUE_1,
    marginHorizontal: Value.CONSTANT_VALUE_25,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  safearea: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  flexMain: {flex: Value.CONSTANT_VALUE_1},
  paddingTop: {
    paddingTop: Value.CONSTANT_VALUE_57,
  },
};
const Scroller = ({
  enabled,
  style,
  children,
  mainStyle,
  showsVerticalScrollIndicator,
}) => {
  console.log(mainStyle);
  if (enabled) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.paddingTop]}
        style={
          mainStyle ? [styles.flexMain, style] : [styles.container, style]
        }>
        {children}
      </ScrollView>
    );
  }
  return <View style={[styles.container, style]}>{children}</View>;
};
const Container = props => {
  const {
    children,
    scroller = true,
    showHeader = false,
    profileLoad = false,
    headerEnd = false,
    headerComp = null,
    style = {},
    safeAreViewStyle = {},
    mainStyle = false,
    fixedHeader = false,
    showsVerticalScrollIndicator = false,
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
        <SafeAreaView style={[styles.safearea, safeAreViewStyle]}>
          <View style={styles.flexMain} behavior={PADDING_CON}>
            {fixedHeader && (
              <>
                <Header end={headerEnd}>{headerComp()}</Header>
                <Scroller
                  enabled={scroller}
                  style={style}
                  mainStyle={mainStyle}
                  fixedHeader={fixedHeader}
                  showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                  {children}
                </Scroller>
              </>
            )}
            {!fixedHeader && (
              <Scroller
                enabled={scroller}
                style={style}
                mainStyle={mainStyle}
                fixedHeader={fixedHeader}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                {showHeader && <Header end={headerEnd}>{headerComp()}</Header>}
                {children}
              </Scroller>
            )}
          </View>
        </SafeAreaView>
      )}
      {profileLoad && (
        <KeyboardAwareScrollView style={styles.flexMain} behavior={PADDING_CON}>
          {fixedHeader && (
            <>
              <Header end={headerEnd}>{headerComp()}</Header>
              <Scroller
                enabled={scroller}
                style={style}
                mainStyle={mainStyle}
                fixedHeader={fixedHeader}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                {children}
              </Scroller>
            </>
          )}
          {!fixedHeader && (
            <Scroller
              enabled={scroller}
              style={style}
              mainStyle={mainStyle}
              fixedHeader={fixedHeader}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
              {showHeader && <Header end={headerEnd}>{headerComp()}</Header>}
              {children}
            </Scroller>
          )}
        </KeyboardAwareScrollView>
      )}
    </>
  );
};
export default Container;
