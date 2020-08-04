import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

import { default as jwt } from 'jwt-decode';
import { apiConfig } from '../config';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const BASE = `${apiConfig.baseURL}`;
    const token = AsyncStorage.getItem('user');

    const verify = () => {
        try {
            if (token) {
                const decoded = jwt(token.token);
                
                if (!decoded) {
                    throw new Error('Couldn\'t decode the token!');
                };
            };

            return JSON.parse(AsyncStorage.getItem('user'));
        } catch {
            return null;
        };
    };

    const [ user, setUser ] = useState(verify);

    const login = async (email, password) => {
        const url = `${BASE}/users/login`;
        console.log(url);

        const body = {email, password};

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            redirect: 'follow',
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();

        if (!user.error) {
            AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        };

        return user;
    };

    const register = async (email, password, username) => {
        const url = `${BASE}/users/register`;

        const body = {email, password, username};

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    
        const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          redirect: 'follow'
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();
    
        AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    
        return user;
    };

    const changepass = async (token, password) => {
        const url = `${BASE}/users/changepass`;

        const body = {token, password};

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    
        const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          redirect: 'follow'
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();

        return user;
    };

    const deleteUser = async (id) => {
        const url = `${BASE}/users/delete`;

        const body = {id};

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    
        const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          redirect: 'follow'
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();

        return user;
    };

    const logout = async () => {
        AsyncStorage.setItem('user', null);
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, verify, changepass, deleteUser }}>
            { children }
        </AuthContext.Provider>
    )
};

export {
    AuthContext,
    AuthProvider,
    useAuth,
}