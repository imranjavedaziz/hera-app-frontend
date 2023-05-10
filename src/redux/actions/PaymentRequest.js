import { SEND_PAYMENT_REQUEST } from "../Type";

export const SendPaymentRequest = payload => ({
    type: SEND_PAYMENT_REQUEST,
    data: payload,
});
