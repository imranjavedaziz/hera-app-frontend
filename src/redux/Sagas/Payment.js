import {GetMatchListApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAIL,
  GET_MATCH_LIST_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
function* getMatchList(payload) {
  try {
    const result = yield GetMatchListApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_MATCH_LIST_SUCCESS, data: result.data?.data?.data});
    } else {
      yield put({
        type: GET_MATCH_LIST_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: GET_MATCH_LIST_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetMatchList() {
  yield takeLatest(GET_MATCH_LIST, getMatchList);
}
