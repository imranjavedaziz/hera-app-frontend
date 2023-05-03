import {store} from '../redux/store';

const stripeApiCall = async (apiInfo, data) => {
  const stripe_secret = store.getState().Auth.stripe_secret;
  return new Promise(async (resolve, reject) => {
    const stripeBaseUrl = 'https://api.stripe.com';
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${stripe_secret}`);

    let url = `${stripeBaseUrl}${apiInfo.name}`;
    if (apiInfo.type === 'get') {
      for (let property in data) {
        if (data[property] != null) {
          url += `${url.includes('?') ? '&' : '?'}${property}=${
            data[property]
          }`;
        }
      }
    } else {
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    let requestOptions = {
      method: apiInfo.type.toUpperCase(),
      headers: myHeaders,
      redirect: 'follow',
    };

    if (apiInfo.type === 'post') {
      let formBody = [];
      for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      requestOptions.body = formBody;
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          reject(res.error.message);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        if (error?.response) {
          reject(error?.response);
        } else if (error?.request) {
          reject(error?.request);
        } else {
          reject(error?.message);
        }
      });
  });
};

export const addCardToken = data => {
  return stripeApiCall(
    {
      name: '/v1/tokens',
      type: 'post',
      contType: 'application/x-www-form-urlencoded',
    },
    data,
  );
};
export const addBankToken = data => {
  return stripeApiCall(
    {
      name: '/v1/tokens',
      type: 'post',
      contType: 'application/x-www-form-urlencoded',
    },
    data,
  );
};
//ADD CARD
export const createCardSource = data => {
  return stripeApiCall(
    {
      name: `/v1/customers/${data?.customerId}/sources`,
      type: 'post',
      contType: 'application/x-www-form-urlencoded',
    },
    {source: data?.token},
    data?.cardData,
  );
};
export const getCardListApi = (customerId, limit) => {
  return stripeApiCall(
    {
      name: `/v1/customers/${customerId}/sources`,
      type: 'get',
    },
    {
      object: 'card',
      limit: limit || 3,
    },
  );
};
export const getBankListApi = (customerId, limit) => {
  return stripeApiCall(
    {
      name: `/v1/customers/${customerId}/sources`,
      type: 'get',
    },
    {
      object: 'bank_account',
      limit: limit || 3,
    },
  );
};
export const deleteBankOrCard = ({data}) => {
  return stripeApiCall({
    name: `/v1/customers/${data?.customer}/sources/${data?.id}`,
    type: 'delete',
  });
};
