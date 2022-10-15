import {GET_GALLERY_FAIL, GET_GALLERY_SUCCESS, GET_GALLERY} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {getUserGalleryApi} from '../../Api';
import { HttpStatus } from "../../constants/Constants";

//GetUserGallery
function* getUserGallery() {
  try {
    const result = yield getUserGalleryApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_GALLERY_SUCCESS, data: result});
    } else {
      yield put({type: GET_GALLERY_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({type: GET_GALLERY_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetUserGallery() {
  yield takeLatest(GET_GALLERY, getUserGallery);
}
