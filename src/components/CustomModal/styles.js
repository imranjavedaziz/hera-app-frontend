import { dynamicSize, } from '../../utils/responsive';
import Colors from '../../constants/Colors';
import Alignment from '../../constants/Alignment';

const spaceBetween = 'space-between';
export default {
  modalContainer: { flex: 1, backgroundColor: '#000000aa' },
  boxContainer: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: '90%',
    borderRadius: dynamicSize(7),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2.8,
    shadowRadius: 2,
    alignSelf: Alignment.CENTER,
    position: Alignment.ABSOLUTE,
    bottom: 0,
    paddingHorizontal: 4,
  },
};
