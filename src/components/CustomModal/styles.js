import {Platform} from 'react-native';
import {scaleHeight} from '../../utils/responsive';
import Colors from '../../constants/Colors';

const spaceBetween = 'space-between';
export default {
  mainContainerView: {
    backgroundColor: Colors.WHITE,
    marginTop: scaleHeight(23),
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.WHITE,
    width: '100%',
    paddingBottom: scaleHeight(15),
    minHeight: scaleHeight(320),
  },
  swipeDownIcon: {
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? scaleHeight(360) : scaleHeight(361),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    // height: 700,
    flex: 1,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  modalClose: {
    height: scaleHeight(25),
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    top: -15,
    zIndex: 9,
  },
  rectanlge: {
    height: scaleHeight(340),
  },
};
