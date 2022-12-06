import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

import {Picker} from '@react-native-community/picker';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {normalizeFont, scaleHeight} from '../../../utils/responsive';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  topView: {
    paddingVertical: scaleHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: scaleHeight(14),
    backgroundColor: Colors.SHEETCOLOR,
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleHeight(16),
    paddingBottom: scaleHeight(16),
    marginBottom: scaleHeight(50),
  },
  buttonText: {
    fontSize: normalizeFont(16),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
});

export default function CustomPicker({
  isVisible,
  cancel,
  done,
  data = [],
  selected,
  highter,
  weight,
}) {
  const [selectedRecord, setSelectedRecord] = useState();
  useEffect(() => {
    setSelectedRecord(selected);
  }, [selected]);

  function cancelHandler() {
    setSelectedRecord(selected);
    cancel();
  }

  return (
    <>
      {data.length > 0 && (
        <Modal
          transparent
          visible={isVisible}
          animationType="slide"
          onRequestClose={() => console.log('onRequestClose')}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => cancelHandler()}
            />
            <View style={styles.topView}>
              <Text
                onPress={() => {
                  let id = selectedRecord ?? selected;
                  if (id) {
                    done(id);
                  } else {
                    if (data.length > 0) {
                      done(data[0]);
                    }
                  }
                }}
                style={styles.buttonText}>
                Done
              </Text>
            </View>
            <Picker
              selectedValue={selectedRecord?.id ?? selected?.id ?? 1}
              onValueChange={(_itemValue, itemIndex) => {
                setSelectedRecord(data[itemIndex]);
              }}
              itemStyle={{
                backgroundColor: Colors.MIDDLE_SHEET,
                color: Colors.TEXT_SHEET,
              }}>
              {data.map((value, i) => {
                return (
                  <Picker.Item
                    label={
                      weight === true
                        ? value.name + ' pounds'
                        : !highter
                        ? value.name
                        : `${parseInt(value.name / 12)} ft ${
                            value.name % 12
                          } in`
                    }
                    value={value.id ?? i}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
        </Modal>
      )}
    </>
  );
}
