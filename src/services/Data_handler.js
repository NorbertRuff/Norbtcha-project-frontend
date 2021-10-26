import axios from 'axios';

let getLocalstorage = () => {
    if (localStorage.getItem('token') !== null) {
        return `Bearer ${localStorage.getItem('token')}`;
    } else {
        return "";
    }
}

export let dataHandler = {

    _data: {},
    _api_get: function (url, callback, errorCallback, loadingCallback) {
        axios
            .get(url, {
                method: 'GET',
                credentials: 'same-origin',
                ContentType: "application/x-www-form-urlencoded",
                headers: {
                    authorization: getLocalstorage(),
                }
            })
            .then((response) => {
                if (callback !== undefined) {
                    callback(response.data);
                }
            })
            .catch((error) => {
                if (errorCallback !== undefined) {
                    errorCallback(error.message);
                }
                console.error(
                    `The request was made and the server responded
        with a status code that falls out of the range of 2xx ` + error.message
                );
            })
            .finally(() => {
                if (loadingCallback !== undefined) {
                    loadingCallback(false)
                }
            });
    },
    _api_post: async function (url, data) {
        let result = await axios
            .post(url, data, {
                method: 'POST',
                credentials: 'same-origin',
                ContentType: "application/x-www-form-urlencoded",
                headers: {
                    authorization: getLocalstorage(),
                }
            })
            .then(response => {
                return response;
            })
            .catch((error) => {
                console.error(
                    `The request was made and the server responded with a status code that falls out of the range of 2xx `
                    + error.message
                );
            })
        return result.data
    },
}
