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
import {Value} from '../constants/FixedValues';

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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
      {profileLoad === false ? (
        <SafeAreaView style={[styles.safearea, safeAreViewStyle]}>
          <KeyboardAvoidingView
            style={styles.flexMain}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {fixedHeader === true ? (
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
            ) : (
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
          </KeyboardAvoidingView>
        </SafeAreaView>
      ) : (
        <KeyboardAvoidingView
          style={styles.flexMain}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {fixedHeader === true ? (
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
          ) : (
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
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default Container;
