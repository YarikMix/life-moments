import axios from "axios";
import {DOMEN} from "./consts";

export const api = axios.create({
    baseURL: DOMEN + '/api/',
    timeout: 1000
});