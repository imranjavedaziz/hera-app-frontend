
const BASE_URL = 'https://4a64-103-82-82-141.in.ngrok.io';

const sendSmsVerification = async (phoneNumber) => {
  try {
    const data = JSON.stringify({
      country_code: "+91",
      phone_no: phoneNumber
    });
    console.log(data);
 
    const response = await fetch(`${BASE_URL}/api/v1/sent-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
 
    const json = await response.json();
    console.log(json);
    return json.success;

  } catch (error) {
    console.error(error);
    return false;
  }
 };

const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      country_code: +91 ,
      phone_no: phoneNumber ,
      otp: code ,
    });

    // console.log('body', data);

    const response = await fetch(`${BASE_URL}/api/v1/verify-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      },
    );

    const json = await response.json();
     console.log(json);
    return json ;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
