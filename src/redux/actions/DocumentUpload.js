import {
  DOCUMENT_UPLOAD_PAYMENT,
  DOCUMENT_UPLOAD,
  DOCUMENT_GET,
  DOCUMENT_GET_ClEAN,
} from '../Type';

export const DocumentUpload = payload => {
  return {
    type: DOCUMENT_UPLOAD,
    data: payload,
  };
};

export const DocumentUploadPayment = payload => ({
  type: DOCUMENT_UPLOAD_PAYMENT,
  data: payload,
});

export const DocumentGet = payload => {
  return {
    type: DOCUMENT_GET,
    data: payload,
  };
};
export const CleanDocument = () => ({type: DOCUMENT_GET_ClEAN});
