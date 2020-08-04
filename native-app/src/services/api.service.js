import {
    default as React,
    useContext,
    createContext,
} from 'react';

import {
    apiConfig,
} from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
    const BASE_URL = `${apiConfig.baseURL}`;

    const getUser = async (id) => {
        let url = `${BASE_URL}/users/${id}`;
        const res = await fetch(url);

        return res.json();
    };

    const getUserDates = async (id) => {
        let url = `${BASE_URL}/dates/${id}`;
        const res = await fetch(url);

        return res.json();
    };

    const getUserByMail = async (email) => {
        console.log(email);
        const options = {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        };

        let url = `${BASE_URL}/users/mail`;
        const response = await fetch(url, options);

        return response.json();
    };

    const showDate = async (date, user) => {
        let url = `${BASE_URL}/dates/date/${date}/${user}`;
        const res = await fetch(url);

        return res.json();
    };

    const createDate = async (date) => {
        const options = {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(date)
        };

        let url = `${BASE_URL}/dates/date`;
        const response = await fetch(url, options);

        return response.json();
    };

    const fillDate = async (date) => {
        const options = {
            method: "put",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(date)
        };

        let url = `${BASE_URL}/dates/date`;
        const response = await fetch(url, options);

        return response.json();
    };

    const forgetPass = async (id) => {
        const options = {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        };

        let url = `${BASE_URL}/events/forgetpass`;
        const response = await fetch(url, options);

        return response.json();
    };

    const checkCode = async (email, code) => {
        const options = {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, code})
        };

        let url = `${BASE_URL}/events/check`;
        const response = await fetch(url, options);

        return response.json();
    };

    const checkToken = async (token) => {
        let url = `${BASE_URL}/events/${token}`;
        const res = await fetch(url);

        return res.json();
    };

    return (
        <ApiContext.Provider value={{
            getUser,
            getUserDates,
            showDate,
            createDate,
            fillDate,
            forgetPass,
            getUserByMail,
            checkCode,
            checkToken,
        }}>
            {children}
        </ApiContext.Provider>
    )
};

export {
    ApiContext,
    ApiProvider,
    useApi,
};