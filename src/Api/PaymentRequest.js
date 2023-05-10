// PaymentRequest
import {ApiPath} from '../constants';
import axiosRequest from '../utils/axiosRequest';

export const SendPaymentRequestApi = (data) => {
    return axiosRequest.post(ApiPath.sendPaymentRequest,data);
};
