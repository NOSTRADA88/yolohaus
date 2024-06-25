import axios from "axios";

export const API_URL = 'https://nostrada-kys.ru';
const token = '785c342441821d6e6e183b495c66103228252fbee1359b27f1dd78afab4ede7b9f0e84fd560ae95f28dbe76f78b25cce26f83a5812f515b85ae433e0befb76093b8aa5ddc352b536639dca646ffa9e043f687d732142c40decc242a6e699a8ce254a2d58a2d785c33c7de63ddc00ecf91ab441debd2e9ae2db0ed4bc3a96f669';


export const axiosInstanse = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthorizationHeader = () => {
    axiosInstanse.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

setAuthorizationHeader();

