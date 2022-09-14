const environment = {
  dev: {
    bucket: 'geldating-dev-frontend',
    api_url: '',
  },
  qa: {
    bucket: 'geldating-qa-frontend',
    api_url: '',
  },
  stage: {
    bucket: 'geldating-stage-frontend',
    api_url: '',
  },
};
export const {bucket, api_url} = environment.dev;

export const awsOptions = {
  keyPrefix: 'user/',
  bucket,
  region: 'us-east-1',
  accessKey: 'AKIA6AQM5CRWVFVXK67D',
  secretKey: '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',
  successActionStatus: 201,
};

export const HttpStatus = {
  UNAUTHORISED: 401,
  SUCCESS_REQUEST: 200,
  SUCCESS_CODE_202: 202,
  SUCCESS_CODE_201: 201,
  SUCCESS_CODE_204: 204,
  UNAUTHORISED_400: 400,
  SUCCESS_CODE_205: 205,
};

export const Fonts = {
  OoohBabyRegular: 'OoohBaby-Regular',
  OpenSansBold: 'OpenSans-Bold',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansRegular: 'OpenSans-Regular',
  OpenSansSemibold: 'OpenSans-Semibold',
}
