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
import {Fonts} from '../constants/Constants';

const Searchbar = props => {
  const {onChangeText, editing, croxxIcon, onClear, value} = props;
  return (
    <View style={styles.mainContainer}>
      <View
        style={
          editing ? styles.searchBarContainer : styles.searchEditBarContainer
        }>
        <Image style={styles.searchImage} source={Images.search} />
        <TextInput
          style={styles.searchBar}
          value={value}
          onChangeText={text => onChangeText(text)}
          placeholder={Strings.search_Bar.search}
          placeholderTextColor={Colors.BLACK}
          keyboardType={'web-search'}
          autoCorrect={false}
        />
        {editing && !croxxIcon && value && (
          <TouchableOpacity onPress={onClear} style={styles.crossIconContainer}>
            <Image style={styles.crossIcon} source={Images.iconcross} />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    fontFamily: Fonts.OpenSansRegular,
    marginLeft: Value.CONSTANT_VALUE_5,
  },
  searchBarContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: Alignment.ROW,
    width: Value.CONSTANT_VALUE_350,
    height: Value.CONSTANT_VALUE_50,
    alignSelf: Alignment.CENTER,
    padding: Value.CONSTANT_VALUE_5,
    borderRadius: Value.CONSTANT_VALUE_8,
    marginBottom: Value.CONSTANT_VALUE_12,
  },
  searchEditBarContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: Alignment.ROW,
    width: Value.CONSTANT_VALUE_284,
    height: Value.CONSTANT_VALUE_50,
    alignSelf: Alignment.CENTER,
    padding: Value.CONSTANT_VALUE_5,
    marginBottom: Value.CONSTANT_VALUE_12,
  },
  searchImage: {
    alignSelf: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_15,
  },
  pinIcon: {
    marginRight: Value.CONSTANT_VALUE_15,
    alignSelf: Alignment.CENTER,
  },

  clearView: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_10,
    marginLeft: Value.CONSTANT_VALUE_15,
  },
  clearText: {
    fontWeight: Alignment.BOLD,
    color: Colors.RED,
    textDecorationLine: Alignment.UNDERLINE,
    alignSelf: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_16,
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
});
