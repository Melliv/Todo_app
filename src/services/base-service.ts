import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IErrorMessageResponse } from '../types/IErrorMessageResponse';
import { IFetchResponse } from '../types/IFetchResponse';

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };  
        return config;      
    }

    static async getAll<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity[]>> {
        try {
            let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError<IErrorMessageResponse>;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: error.response!.data.title
            }
        }

    }

    static async get<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError<IErrorMessageResponse>;;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: error.response!.data.title
            }
        }
    }

    static async post<TEntity>(apiEndpoint: string, dto: TEntity, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.post<TEntity>(apiEndpoint, dto, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        }
        catch (err) {
            let error = err as AxiosError<IErrorMessageResponse>;;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: error.response!.data.title
            }
        }
    }

    static async put<TEntity>(apiEndpoint: string, dto: TEntity, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.put<TEntity>(apiEndpoint, dto, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        }
        catch (err) {
            let error = err as AxiosError<IErrorMessageResponse>;;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: error.response!.data.title
            }
        }
    }


    
    static async delete<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.delete(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError<IErrorMessageResponse>;;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: error.response!.data.title
            }
        }
    }

}
