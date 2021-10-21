import { ILoginResponse } from '../types/ILoginResponse';
import { IRegister } from '../types/IRegister';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';
import { ILogin } from '../types/ILogin';

export abstract class IdentityService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async Login(apiEndpoint: string, loginData: ILogin): Promise<IFetchResponse<ILoginResponse>> {
        let loginDataJson = JSON.stringify(loginData);
        try {
            let response: AxiosResponse<ILoginResponse>  = await this.axios.post(apiEndpoint, loginDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error: AxiosError<never> = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as unknown as IMessages).messages.toString()
            }
        }

    }

    static async Register(apiEndpoint: string, registerData: IRegister): Promise<IFetchResponse<AxiosResponse>> {
        let registerDataJson = JSON.stringify(registerData);
        try {
            let response: AxiosResponse = await this.axios.post(apiEndpoint, registerDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data ?? "some error").toString()
            }
        }

    }

}
