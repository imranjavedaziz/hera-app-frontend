// search Bar
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Images from '../constants/Images';
import Strings from '../constants/Strings';
import Alignment from '../constants/Alignment';
import {Value} from '../constants/FixedValues';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Fonts, Routes} from '../constants/Constants';

const Searchbar = props => {
  const navigation = useNavigation();
  return (
    <>
      {props.clearVisible === false &&
      props.editing &&
      props.isFocused === false ? null : (
        <View style={styles.cancelbtn}>
          <TouchableOpacity onPress={props.onClear} style={styles.clearView}>
            <Text style={styles.clearText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.mainContainer}>
        <View
          style={
            props.editing
              ? styles.searchBarContainer
              : styles.searchEditBarContainer
          }>
          <Image style={styles.searchImage} source={Images.search} />
          <TextInput
            returnKeyType="go"
            returnKeyLabel="Go"
            style={styles.searchBar}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder={
              props.sm ? Strings.search_Bar.smSearch : Strings.search_Bar.search
            }
            placeholderTextColor={Colors.BLACK}
            keyboardType={'web-search'}
            autoCorrect={false}
            onFocus={props?.handleFocus}
            onBlur={props?.handleBlur}
          />

          {props.editing && !props.croxxIcon && (
            <TouchableOpacity
              onPress={props.onClear}
              style={styles.crossIconContainer}>
              <Image style={styles.crossIcon} source={Images.iconcross} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.mapView}
          onPress={() =>
            navigation.navigate(Routes.stateList, {
              selectedStateList: props?.selectedStates,
            })
          }>
          <Image source={Images.pin} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: Alignment.ROW,
  },
  searchBar: {
    flex: Value.CONSTANT_VALUE_1,
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingLeft: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_16,
    marginLeft: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  searchBarContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: Alignment.ROW,
    width: Value.CONSTANT_VALUE_290,
    height: Value.CONSTANT_VALUE_50,
    alignSelf: Alignment.CENTER,
    padding: Value.CONSTANT_VALUE_5,
    borderRadius: Value.CONSTANT_VALUE_8,
    marginBottom: Value.CONSTANT_VALUE_12,
  },
  searchEditBarContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: Alignment.ROW,
    width: Value.CONSTANT_VALUE_297,
    height: Value.CONSTANT_VALUE_50,
    alignSelf: Alignment.CENTER,
    padding: Value.CONSTANT_VALUE_5,
    marginBottom: Value.CONSTANT_VALUE_12,
    borderRadius: 8,
  },
  searchImage: {
    alignSelf: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_15,
  },
  pinIcon: {
    marginRight: Value.CONSTANT_VALUE_15,
    alignSelf: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_15,
    width: Value.CONSTANT_VALUE_51,
    height: Value.CONSTANT_VALUE_50,
    opacity: 0.8,
    borderRadius: Value.CONSTANT_VALUE_8,
    backgroundColor: Colors.WHITE,
    justifyContent: Alignment.CENTER,
  },
  mapView: {
    width: Value.CONSTANT_VALUE_51,
    height: Value.CONSTANT_VALUE_50,
    borderRadius: Value.CONSTANT_VALUE_8,
    marginLeft: Value.CONSTANT_VALUE_6,
    backgroundColor: Colors.WHITE,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  crossIconContainer: {
    marginRight: Value.CONSTANT_VALUE_3,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginBottom: 14,
  },
  crossIcon: {
    height: Value.CONSTANT_VALUE_24,
    width: Value.CONSTANT_VALUE_24,
    marginTop: Value.CONSTANT_VALUE_14,
    marginRight: Value.CONSTANT_VALUE_8,
  },
  clearView: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  clearText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: 16,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
    height: 22,
  },
  cancelbtn: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.FLEXEND,
    marginBottom: Value.CONSTANT_VALUE_25,
  },
});
