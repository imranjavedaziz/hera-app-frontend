import {
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

export const askCameraPermission = () => {
    request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    )
};

export const locationPermission = async () => {
    let allowed = false;
    if (Platform.OS === 'ios') {
        const permission =
            parseInt(Platform.Version, 10) < 13
                ? PERMISSIONS.IOS.LOCATION_ALWAYS
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        const resultPermission = await request(permission);
        allowed = resultPermission === 'granted' || resultPermission === 'limited';
    } else {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Permission',
                message: "App needs access to your phone's location.",
            },
        );
        allowed = granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return allowed;
};
