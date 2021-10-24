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
    _api_get_selectOptions: function (url, callback, callbackOfTheCallback, errorCallback, loadingCallback) {
        axios
            .get(url, {
                method: 'GET',
                credentials: 'same-origin'
            })
            .then((response) => {
                callback(response.data, callbackOfTheCallback);
            })
            .catch((error) => {
                errorCallback(error.message);
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

    _api_get_results: function (url, callback, errorCallback) {
        axios
            .get(url)
            .then((response) => {
                callback(response.data.results);
            })
            .catch((error) => {
                errorCallback(error.message);
                console.error(
                    `The request was made and the server responded
        with a status code that falls out of the range of 2xx ` + error.message
                );
            });

    },
    _api_post: function (url, data, callback, errorCallback) {
        axios
            .post(url, data, {
                method: 'POST',
                credentials: 'same-origin',
                ContentType: "application/x-www-form-urlencoded",
                headers: {
                    authorization: getLocalstorage(),
                }
            })
            .then(response => {
                if (callback !== undefined) {
                    callback(response.data);
                }
            })
            .catch((error) => {
                if (errorCallback !== undefined) {
                    errorCallback(error.message);
                }
                console.error(
                    `The request was made and the server responded with a status code that falls out of the range of 2xx `
                    + error.message
                );
            })
    },

    _api_delete: function (url, data) {
        axios.delete(url, {
            headers: {
                Authorization: getLocalstorage(),
            },
            data
        });
    },
}
