import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import imagePath from '../constants/imagePath';

const DropDown = ({code, value, onSelect}) => {
  const [showOption, setShowOptions] = React.useState(false);

  const onSelectedItem = val => {
    setShowOptions(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDown}
        activeOpacity={0.7}
        onPress={() => setShowOptions(!showOption)}>
        <Text>{!!value ? value?.code : 'Code'}</Text>
        <Image
          style={{
            height: 25,
            width: 25,
            transform: [{rotate: showOption ? '180deg' : '0deg'}],
          }}
          source={imagePath.dropDown}
        />
      </TouchableOpacity>
      {showOption && (
        <ScrollView keyboardShouldPersistTaps="handled">
          {code.map((val, i) => {
            return (
              <TouchableOpacity
                onPress={() => onSelectedItem(val)}
                style={{
                    backgroundColor: value?.id == val.id ? 'orange' : null,
                  padding: 8,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                }}>
                <Text key={String(i)}>{val.code}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: '30%',
    // backgroundColor:'pink'
    // flexDirection:'row'
  },
  dropDown: {
    backgroundColor: 'lightgrey',
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
