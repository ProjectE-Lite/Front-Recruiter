import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import { YOURAPI } from "../constants/editendpoint";

export const Authcontext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [state, setState] = useState(1);

    const login = (username, password) => {
        setIsLoading(true)
        axios.patch(`http://${YOURAPI}/recruiters/login`, {
            username,
            password
        })
        .then(res => {
            setUserToken(res.data['access token'])
            setUserInfo(res.data['data'])
            if (res && res.data && res.data['access token'] && res.data['data']){
                AsyncStorage.setItem('userToken', res.data['access token'])
                AsyncStorage.setItem('userInfo', JSON.stringify(res.data['data'])) 
                setState(1)
            }
        })
        .catch(e => {
            console.log(`Login error ${e}`)
            setState(0)
        }) 
        setIsLoading(false)
    }

    const logout = async () => {
        setIsLoading(true)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setUserToken(null);
        setUserInfo(null);
        setIsLoading(false)
    }
    const isLoggedIn = async() => {
        try{ 
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }
            setIsLoading(false)
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    return(
        <Authcontext.Provider value={{login, logout, isLoading, userToken, userInfo, state}}>
            {children}
        </Authcontext.Provider>
    )
}