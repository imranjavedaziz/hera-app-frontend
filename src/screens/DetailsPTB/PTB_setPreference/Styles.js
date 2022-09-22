import {StyleSheet} from 'react-native';
import {Value} from '../../../constants/FixedValues';
import {Fonts, Routes} from '../../constants/Constants';
import Colors from '../../../constants/Colors';

export default {
  label: {
    position: 'absolute',
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
  },
  lookingsm: {
    alignItems: 'center',
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: 'bold',
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_27,
  },
  lookingDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: 'bold',
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_29,
  },
  lookingsDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: 'bold',
    fontSize: Value.CONSTANT_VALUE_16,
  },
  SDonorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Value.CONSTANT_VALUE_10,
  },
  heightText: {
    color: 'red',
    fontSize: Value.CONSTANT_VALUE_18,
  },
  chipText: {
    marginVertical: Value.CONSTANT_VALUE_15,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  chipsRequiredText: {
    color: 'red',
    fontSize: Value.CONSTANT_VALUE_18,
  },
  hairContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: Value.CONSTANT_VALUE_5,
  },
  chips: {
    height: Value.CONSTANT_VALUE_40,
    width: Value.CONSTANT_VALUE_90,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: 'center',
    marginRight: Value.CONSTANT_VALUE_9,
    marginVertical: Value.CONSTANT_VALUE_5,
    padding: CONSTANT_VALUE_0,
  },
  eyeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVerticle: Value.CONSTANT_VALUE_5,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  ageText: {
    marginVertical: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  ageRangeChip: {
    height: Value.CONSTANT_VALUE_41,
    width: Value.CONSTANT_VALUE_104,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: 'center',
    marginRight: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_0,
  },
};
