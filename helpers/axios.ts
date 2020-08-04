import axios from 'axios';
import { apiBaseURL, fileBaseURL } from '../env/config';

interface ErrorTips { // 定义errortips类型
    tip: string,
    response: object,
    data: object
}

export default class Axios {
    axios (method: string, url: string, params: object, type: string): Promise<any> {
        const baseURL = type === 'api' ? apiBaseURL : fileBaseURL;
        return new Promise((resolve, reject) => {
            let _options = params;
            _options = {
                method,
                url,
                baseURL,
                timeout: 30000,
                params: null,
                data: null,
                headers: null,
                withCredentials: true,
                ...params
            };
            axios.request(_options).then((res: any) => {
                if (res.config.responseType === 'blob') { // 下载文件
                    resolve(res);
                } else {
                    resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
    async get (url: string, params: object, errTips: string, type = 'api'): Promise<any> {
        try {
            let result = await this.axios('get', url, params, type);
            if (result && result.code === 2000) {
                return result.data;
            } else if (result && result.code === 2001) { // 如果请求数据为空
                return result.message
            }
            let err: ErrorTips = {
                tip: errTips,
                response: result,
                data: params
            }
            throw err;
        } catch (err) {
            throw err;
        }
    }
    async post (url: string, params: object, errTips: string, type = 'api'): Promise<object> {
        try {
            let result = await this.axios('post', url, params, type);
            if (result && result.code === 2000) {
                if (result.data) 
                    return result.data;
                else 
                    return result.message;
            }
            let err: ErrorTips = {
                tip: errTips,
                response: result,
                data: params
            }
            throw err;
        } catch (err) {
            throw err;
        }
    }
    async getFile (url: string, params: object, errTips: string, type = 'api'): Promise<object> {
        try {
            let result = await this.axios('get', url, params, type);
            return result;
        } catch (err) {
            throw err;
        }
    }
}