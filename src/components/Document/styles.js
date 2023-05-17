import {StyleSheet} from 'react-native';
import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {normalizeFont, scaleHeight, scaleWidth} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';

export const styles = StyleSheet.create({
  docsContainer: {},
  selectField: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: normalizeFont(16),
    color: Colors.BLACK,
    marginTop: scaleHeight(30),
    paddingLeft: 40,
  },
  addImageButton: {
    height: scaleHeight(95),
    width: scaleWidth(95),
    backgroundColor: Colors.DocBack,
    justifyContent: 'center',
    marginRight: scaleWidth(15),
    alignItems: 'center',
    marginTop: scaleWidth(19),
    marginBottom: scaleWidth(20),
    marginLeft: scaleWidth(40),
  },
  photoView: {
    height: scaleHeight(95),
    width: scaleWidth(95),
    backgroundColor: Colors.BACKGROUND,
    marginTop: scaleWidth(19),
    marginBottom: scaleWidth(20),
    alignItems: 'center',
    marginRight: scaleWidth(21),
  },
  gallaryPhoto: {
    width: '100%',
    height: '100%',
  },
  crossIcon: {
    position: 'absolute',
    right: -10,
    top: -9,
  },
  errorText: {
    color: Colors.RED,
    textAlign: Alignment.RIGHT,
    marginVertical: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    fontFamily: Fonts.OpenSansRegular,
  },
  selectFieldDesc: {
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    marginTop: scaleHeight(20),
    fontSize: normalizeFont(13),
  },
  desc: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: normalizeFont(13),
    color: Colors.BLACK,
    textAlign: 'left',
    marginTop: scaleHeight(5),
    lineHeight: scaleHeight(21),
  },
});
