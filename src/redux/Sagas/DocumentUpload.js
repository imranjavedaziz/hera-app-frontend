import {
  DOCUMENT_UPLOAD,
  DOCUMENT_UPLOAD_FAIL,
  DOCUMENT_UPLOAD_SUCCESS,
  DOCUMENT_GET,
  DOCUMENT_GET_FAIL,
  DOCUMENT_GET_SUCCESS,
} from '../Type';

import {takeLatest, put} from 'redux-saga/effects';
import {DocumentGetApi, DocumentUploadApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {ValidationMessages} from '../../constants/Strings';

function* DocumentUpload(payload) {
  try {
    const result = yield DocumentUploadApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      console.log(result, 'aaresultDoc');
      yield put({type: DOCUMENT_UPLOAD_SUCCESS, data: result});
    } else {
      yield put({
        type: DOCUMENT_UPLOAD_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: DOCUMENT_UPLOAD_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchDocumentUpload() {
  yield takeLatest(DOCUMENT_UPLOAD, DocumentUpload);
}
function* DocumentGet(payload) {
  try {
    const result = yield DocumentGetApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DOCUMENT_GET_SUCCESS, data: result.data});
    } else {
      yield put({
        type: DOCUMENT_GET_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: DOCUMENT_GET_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchDocumentGet() {
  yield takeLatest(DOCUMENT_GET, DocumentGet);
}
