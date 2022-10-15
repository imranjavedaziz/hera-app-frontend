import {all, fork} from 'redux-saga/effects';
import {
  watchLogIn,
} from "./Auth";
import { watchGetUserGallery } from "./CreateGallery";

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchGetUserGallery),
  ]);
}
