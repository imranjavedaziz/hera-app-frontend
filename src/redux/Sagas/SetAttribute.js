import {setPreferenceApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  GET_ATTRIBUTE, GET_ATTRIBUTE_FAIL, GET_ATTRIBUTE_SUCCESS,
  SET_PREFERENCE,
  SET_PREFERENCE_FAIL,
  SET_PREFERENCE_SUCCESS,
} from "../Type";
import {takeLatest, put} from 'redux-saga/effects';
import { getAttributes } from "../../Api/SetAttribute";
function* SetAttributeRes() {
  try {
    const result = yield getAttributes();
    console.log(result, "result:::::::::::");
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_ATTRIBUTE_SUCCESS, data: result});
    } else {
      yield put({
        type: GET_ATTRIBUTE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: GET_ATTRIBUTE_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSetAttribute() {
  yield takeLatest(GET_ATTRIBUTE, SetAttributeRes);
}
