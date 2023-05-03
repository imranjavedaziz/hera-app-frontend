import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {normalizeFont, scaleHeight, scaleWidth} from '../../utils/responsive';

export const styles = StyleSheet.create({
  docsContainer: {
    // flex: 1,
    marginBottom: scaleHeight(25),
  },
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
    color: Colors.errorRed,
    fontSize: normalizeFont(12),
    textAlign: 'right',
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
