import {NEXT_STEP, NEXT_STEP_FAIL, NEXT_STEP_SUCCESS} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {ValidationMessages} from '../../constants/Strings';
import {NextStepApi} from '../../Api';

function* NextStep(payload) {
  try {
    const result = yield NextStepApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      console.log(result, 'NEXT_STEP_RESPONSE');
      yield put({type: NEXT_STEP_SUCCESS, data: result});
    } else {
      yield put({
        type: NEXT_STEP_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: NEXT_STEP_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchNextStep() {
  yield takeLatest(NEXT_STEP, NextStep);
}
