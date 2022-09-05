import {RNS3} from 'react-native-aws3';
import {awsOptions} from '../constants/Constants';

const uploadS3 = s3uploadData => {
  return new Promise(async (resolve, reject) => {
    const e = new Error('Failed to upload image.');
    RNS3.put(s3uploadData, awsOptions)
      .then(response => {
        if (response.status !== 201) {
          reject(e);
        } else {
          const {location} = response.body.postResponse;
          resolve(location);
        }
      })
      .catch(() => {
        reject(e);
      });
  });
};
export default uploadS3;
