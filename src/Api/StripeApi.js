const stripeApiCall = async (apiInfo, data) => {
  return new Promise((resolve, reject) => {
    const stripeBaseUrl = 'https://api.stripe.com';
    let myHeaders = new Headers();
    let url = `${stripeBaseUrl}${apiInfo.name}`;
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
const contType = 'application/x-www-form-urlencoded';
export const addBankToken = data => {
  return stripeApiCall(
    {
      name: '/v1/tokens',
      type: 'post',
      contType: contType,
    },
    data,
  );
};

//ADD CARD
export const createCardSource = data => {
  return stripeApiCall(
    {
      name: `/v1/accounts/${data?.customerId}/external_accounts`,
      type: 'post',
      contType: contType,
    },

    data?.cardData,
  );
};
export const getCardListApi = (customerId, limit) => {
  return stripeApiCall(
    {
      name: `/v1/payment_methods`,
      type: 'get',
    },
    {
      customer: customerId,
      type: 'card',
      limit: limit || 10,
    },
  );
};
export const getBankListApi = (customerId, limit) => {
  return stripeApiCall(
    {
      // name: `/v1/customers/${customerId}/sources`,
      name: `/v1/accounts/${customerId}/external_accounts`,
      type: 'get',
    },
    {
      object: 'bank_account',
      limit: limit || 3,
    },
  );
};
export const deleteCard = ({data}) => {
  return stripeApiCall({
    name: `/v1/payment_methods/${data?.id}/detach`,
    type: 'post',
  });
};

export const deleteBank = ({data}) => {
  return stripeApiCall({
    name: `/v1/accounts/${data?.account}/external_accounts/${data?.id}`,
    type: 'delete',
  });
};
export const createPaymentIntent = data => {
  return stripeApiCall(
    {
      name: '/v1/payment_methods',
      type: 'post',
      contType: contType,
    },
    {
      type: 'card',
      ...data?.data,
    },
  );
};
export const attachPaymentMethod = ({customerId, id}) => {
  return stripeApiCall(
    {
      name: `/v1/payment_methods/${id}/attach`,
      type: 'post',
      contType: contType,
    },
    {customer: customerId},
  );
};
