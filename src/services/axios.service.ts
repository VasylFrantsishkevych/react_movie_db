import axios, {AxiosResponse} from "axios";

import {baseURL} from "../constants";

export type AxiosRes<T> = Promise<AxiosResponse<T>>

const axiosService = axios.create({
    baseURL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTJkYmQ4NGI5OThiNzBhOWRiZWE3OTBkMjU2NWYzYSIsInN1YiI6IjYxZmUzZTZhNGI2ZDlkMDA2YTlkZTU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VrJLoQYWQeuDn-f-CBdwwVFAMRPp-4vUJ1zidADNENk'
    }
})

export {
    axiosService
}
