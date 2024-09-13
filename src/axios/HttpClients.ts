import axios, { Method } from 'axios';
import { message } from 'antd';

const ERROR_MESSAGES: { [key: number]: string } = {
    400: '错误请求',
    401: '请检查用户名和密码',
    403: '身份过期请重新登录',
    404: '请求错误,未找到该资源',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器端出错',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
};

// Utility functions
function toType(obj: any): string {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)![1].toLowerCase();
}

function filterNull(o: any): any {
    for (const key in o) {
        if (o[key] === null) delete o[key];
        else if (typeof o[key] === 'string') o[key] = o[key].trim();
        else if (typeof o[key] === 'object') o[key] = filterNull(o[key]);
    }
    return o;
}

function handleAxiosError(error: any): void {
    const errCode = error.response?.status;
    const errMsg = ERROR_MESSAGES[errCode] || '未知错误';

    if (error.response?.data?.msg === 'Token已过期' || errCode === 403 || errCode === 401) {
        message.error(errMsg);
        redirectToLogin();
    } else {
        console.error(errMsg);
    }
}

function redirectToLogin(): void {
    window.location.href = '/#/login';
}

function apiAxios(method: Method, url: string, params: any): Promise<any> {
    if (params) params = filterNull(params);

    return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = localStorage.getItem('accessToken');
        
        axios({
            method,
            url,
            data: ['POST', 'PUT'].includes(method) ? params : null,
            params: ['GET', 'DELETE', 'PATCH'].includes(method) ? params : null,
            withCredentials: false
        })
        .then(res => {
            if (res.data.msg === 'Token已过期') {
                message.error('Token已过期');
                redirectToLogin();
            } else if (res.status === 200) {
                resolve(res);
            } else {
                reject('Axios返回状态不对，查看请求处理过程．．．．');
            }
        })
        .catch(err => {
            handleAxiosError(err);
            reject(err);
        });
    });
}

export default {
    get: (url: string, params: any) => apiAxios('GET', url, params),
    post: (url: string, params: any) => apiAxios('POST', url, params),
    put: (url: string, params: any) => apiAxios('PUT', url, params),
    delete: (url: string, params: any) => apiAxios('DELETE', url, params),
    patch: (url: string, params: any) => apiAxios('PATCH', url, params)
};
