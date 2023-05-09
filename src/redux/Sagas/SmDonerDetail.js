import {HttpStatus} from '../../constants/Constants';
import {
  SM_DONOR_DETAIL,
  SM_DONOR_DETAIL_FAIL,
  SM_DONOR_DETAIL_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {SmDonorDetailApi} from '../../Api/SmDonerDetail';
import {ValidationMessages} from '../../constants/Strings'
function* SmDonorDetail(payload) {
  try {
    const result = yield SmDonorDetailApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      console.log('SmDonorDetailApi data',JSON.stringify(result.data.data));
      yield put({type: SM_DONOR_DETAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: SM_DONOR_DETAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SM_DONOR_DETAIL_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchSmDonorDetail() {
  yield takeLatest(SM_DONOR_DETAIL, SmDonorDetail);
}
