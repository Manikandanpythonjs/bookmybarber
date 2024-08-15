import {
  scale as sw,
  verticalScale as vh,
  moderateScale as mwh,
} from "react-native-size-matters";

export const SW = (size: number) => {
  return sw(size);
};
export const VH = (size: number) => {
  return vh(size);
};
export const MWH = (size: number) => {
  return mwh(size);
};
