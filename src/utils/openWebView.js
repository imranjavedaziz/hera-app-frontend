// openWebView
import { Linking, Alert } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

const colors = {
    toolbar: '#41a6df',
    dark: 'black',
    divider: 'white',
}
const openWebView = async url => {
    try {
        if(await InAppBrowser.isAvailable()){
            await InAppBrowser.open(url, {
                dismissButtonStyle: 'Done',
                preferredBarTintColor: colors.toolbar,
                preferredControlTintColor: colors.divider,
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                showTitle: true,
                toolbarColor: colors.toolbar,
                secondaryToolbarColor: colors.dark,
                navigationBarColor: colors.dark,
                navigationBarDividerColor: colors.divider,
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                animations: {
                  startEnter: 'slide_in_right',
                  startExit: 'slide_out_left',
                  endEnter: 'slide_in_left',
                  endExit: 'slide_out_right'
                },
              })
        }
        else{
            Linking.openURL(url);
        }
    }
    catch(e){
        Alert.alert('Alert!',e.message);
    }
}
export default openWebView;
