// search Bar for stateList
import {StyleSheet, View, Image, TextInput} from 'react-native';
import React from 'react';
import Images from '../../../../constants/Images';
import Strings from '../../../../constants/Strings';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import Colors from '../../../../constants/Colors';

const StateSearch = props => {
  // console.log('======', props.allState);

  const filterSearch = text => {
    console.log('FILTER', text);
    if (text) {
      const newData = props.allState?.filter(item => {
        if (item.name.includes(text)) {
          return item.name;
        } else if (item.isActive === true) {
        }
      });
      props.setState(newData);
    } else {
      props.setState(props.allState);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={
          props.editing
            ? styles.searchBarContainer
            : styles.searchEditBarContainer
        }>
        <Image style={styles.searchImage} source={Images.search} />
        <TextInput
          style={styles.searchBar}
          onChangeText={text => filterSearch(text)}
          // value={props.value}
          placeholder={Strings.search_Bar.search}
          placeholderTextColor={Colors.BLACK}
        />
      </View>
    </View>
  );
};

export default StateSearch;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: Alignment.ROW,
  },
  searchBar: {
    flex: Value.CONSTANT_VALUE_1,
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingLeft: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_15,
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
  crossIconContainer: {
    marginRight: Value.CONSTANT_VALUE_3,
  },
  crossIcon: {
    height: Value.CONSTANT_VALUE_24,
    width: Value.CONSTANT_VALUE_24,
    marginTop: Value.CONSTANT_VALUE_8,
    marginRight: Value.CONSTANT_VALUE_8,
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
});
