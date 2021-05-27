//This is a service to post the Login Details to the server

import http from './httpService' ;
import { apiUrl } from '../config.json';


const apiEndpoint = apiUrl + "/login";

export function signin(email, password){
    return http.post(apiEndpoint, { email, password});
}