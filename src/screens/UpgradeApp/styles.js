import {Colors, Alignment} from '../../constants';
import {Fonts} from '../../constants/Constants';

export default {
    container: {
        flex: 1,
        alignItems: Alignment.CENTER,
        justifyContent: Alignment.CENTER,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
    },
    imgContainer: {
        flex: 0,
        alignItems: Alignment.FLEX_START,
        justifyContent: Alignment.CENTER,
    },
    txt1: {
        fontSize: 23,
        fontFamily: Fonts.OpenSansBold,
        color: Colors.COLOR_535858,
        marginBottom: 13,
        marginTop: 23,
        flex: 0,
        textAlign: Alignment.CENTER,
        width: '100%',
    },
    txt2: {
        fontSize: 23,
        fontFamily: Fonts.OpenSansRegular,
        color: Colors.COLOR_535858,
    },
    para: {
        fontSize: 16,
        fontFamily: Fonts.OpenSansRegular,
        color: Colors.COLOR_535858,
        marginBottom: 40,
        marginTop: 8,
        maxWidth: '80%',
        textAlign: Alignment.CENTER,
    },
    img: {
        marginRight: 60,
    },
}
