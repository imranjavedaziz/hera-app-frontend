// responsive
import {Dimensions, PixelRatio, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
export const {width, height} = Dimensions.get('window');
let max;
if (width > height) {
  max = height;
} else {
  max = width;
}
let scale = max / 375;
// based on iphone 6 scale
const DEFAULT = {
  height: 812,
  width: 375,
  roundOff: 2,
};
const ScaleHeight = height / DEFAULT.height;
const ScaleWidth = width / DEFAULT.width;
const STANDARD_WIDTH = DEFAULT.width;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;


export const  normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const normalizeFont = size => {
  const newSize = size * ScaleWidth;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - DEFAULT.roundOff;
};

export const scaleHeight = h => Math.round(h * ScaleHeight);
export const scaleWidth = w => Math.round(w * ScaleWidth);
export const dynamicSize = size => K * size;
export function px(size) {
  if (typeof size === 'number') {
    return size * scale;
  } else {
    return size;
  }
}

export const statusHide = maxNum => {
  return Math.abs(getStatusBarHeight() - maxNum);
};
