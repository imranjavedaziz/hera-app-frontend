export const getParams = (params, methodHTTP) => {
    const data  = new FormData();
    let endpoint ='';
    Object.keeys(params).forEach(x=>{
        data.append(x,params[x]);
        if(methodHTTP = 'PATCH' || method === 'DELETE'){
            endpoint +=  `${x}=${params[x]}&`;
        }
        return x;
    });
    return{ endpoint,data};
};

const getResponseMsg = response => {
    let message='';
    Object.keys(response).forEach(k => {
        if(k !== 'success' && k !== 'status_code' && k!= 'flag'){
            message += `${Array.isArray(response[k]) ? response[k].join('\n') : response[k]
        }. `;
        }
        return k;
    })
    return message;
};

const getCompleteURL = url => {
    const breakUrl = url.spilt('?');
    return breakUrl[0] +'?' + breakUrl[1];
}

const postRequest = async (url, params, methodHTTP = 'POST') => {
    const { endpoint, data } = getParams(params, methodHTTP);
    const header = await fetchToken({
        method: methodHTTP,
        body: data,
        headers: {
            Accept: 'application/json',
        },
    });
    return new Promise((resolve, reject) => {
        fetch(getCompleteURL(`${apiURL + url}?${endpoint}`), header)
            .then(res => {
                res.json()
                .then(response => {
                    if(res.status > 250 && res.status !== 302) {
                        const message = getResponseMsg(response);
                        reject(new Error(message));
                    }
                    else resolve(response);
                })
                .catch(e =>{
                    reject(new Error(`Internal Server Error!\n${e.message}`))
                });
            })
            .catch(e => {
                reject(e);
            });
    });
};

export default postRequest;

