import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {CustomPicker} from 'react-native-custom-picker';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Images from '../../constants/Images';

const Example = ({options, label, control, name, setValue}) => {
  // const renderHeader = () => {
  //   return (
  //     <View style={[styles.headerFooterContainer, {backgroundColor: 'pink'}]}>
  //       <Text>This is header</Text>
  //     </View>
  //   );
  // };

  // const renderFooter = action => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.headerFooterContainer}
  //       onPress={() => {
  //         Alert.alert('Footer', "You've click the footer!", [
  //           {
  //             text: 'OK',
  //           },
  //           {
  //             text: 'Close Dropdown',
  //             onPress: action.close.bind(this),
  //           },
  //         ]);
  //       }}>
  //       <Text>This is footer, click me!</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderField = settings => {
    // const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      // <View style={{backgroundColor:'pink'}}>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <FloatingLabelInput
            label={label}
            value={value}
            onChangeText={v => onChange(v)}
            // error={errors && errors.picker?.message}
            // required={true}
            endComponent={() => (
              <TouchableOpacity
                onPress={() => {
                  if (picker) {
                    picker.showOptions();
                  }
                }}>
                <Image source={Images.arrowDown} />
              </TouchableOpacity>
            )}
            editable={false}
            onPressIn={() => {
              if (picker) {
                picker.showOptions();
              }
            }}
          />
        )}
        name={name}
      />
      // </View>
    );
  };
  const renderOption = settings => {
    const {item, getLabel} = settings;
    return (
      <View style={{paddingVertical: 20, alignSelf: 'center'}}>
        <View style={styles.innerContainer}>
          {/* <View style={[styles.box, { backgroundColor: item.color }]} /> */}
          <Text style={{color: 'black', alignSelf: 'flex-start', fontSize: 17}}>
            {getLabel(item)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <CustomPicker
        ref={el => (picker = el)}
        options={options}
        getLabel={item => item.label}
        fieldTemplate={renderField}
        optionTemplate={renderOption}
        // headerTemplate={renderHeader}
        // footerTemplate={renderFooter}
        onValueChange={value => {
          setValue(name, value.label);
        }}
      />
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 18,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'grey',
    // width:100
    // borderBottomWidth: 5
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
