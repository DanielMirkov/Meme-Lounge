import { notify } from '../views/notification.js';

export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const eror = await response.json();
            notify(eror.message);
            throw new Error(eror.message);
        }
        try {

            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (err) {
        notify(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) {

    const options = {
        method,
        headers: {},
    };

    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

async function get(url) {
    return await request(url, getOptions());
}

async function post(url, data) {

    return await request(url, getOptions('post', data));
}

async function put(url, data) {
    return await request(url, getOptions('put', data));
}

async function del(url) {
    return await request(url, getOptions('delete'));
}


async function login(email, password) {

    const result = await post(settings.host + '/users/login', { email, password });


    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
}

async function register(email, password, username, gender) {

    const result = await post(settings.host + '/users/register', { username, email, password, gender });

    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
}

async function logout() {

    const result = await get(settings.host + '/users/logout');

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('username');
    return result;
}

export {
    login,
    register,
    logout,
    post,
    get,
    put,
    del,
}