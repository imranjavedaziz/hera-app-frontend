import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';

export default {
  container: {
    width: 354,
    height: 115,
    borderWidth: 2,
    borderRadius: 11,
    borderColor: Colors.PINK,
    marginLeft: 20,
    marginTop: 30,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: 22,
    alignItems: 'center',
  },
  mainText: {
    marginLeft: 7,
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
  },
  innerText: {
    textAlign: 'justify',
    paddingHorizontal: 25,
    fontSize: 15,
    fontFamily: Fonts.OpenSansLight,
    marginTop: 5,
  },
};
