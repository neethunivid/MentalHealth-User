import axios, { AxiosInstance } from 'axios';
import config from '../config.json';


class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    const baseURL = config.api.url;

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      //headers: ApiClient.getHeaders()
    });
    
    this.axiosInstance.interceptors.request.use(async config => {
      // Function to match URL with pattern
      function urlMatchesPattern(url:any, pattern:any) {
        const regexPattern = pattern.replace(/\*\*/g, '.*');
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(url);
      }
    
      const excludeUrls = [
        'login/authenticate',
        'api/members/prefList',
        'api/members/job',
        'api/members/addMember',
        'api/inquiry/add',
        'api/magadd/checkEmail',
        'api/magadd/add',
        'api/magadd/getMagid',
        'api/magadd/delete/**',
        'api/diagnose/save',
        'api/reservation/counselingReservationPage',
        '/library/book/morita',
        'api/reservation/reserveUserSlot',
        'api/grant-requests/create'
      ];
    
      // Check if the URL should be excluded from header modification
      const shouldExclude = excludeUrls.some(pattern => urlMatchesPattern(config.url, pattern));
    
      if (!shouldExclude) {
        const headers = await ApiClient.getHeaders();
        if (config.url === 'api/file/upload') {
          headers['Content-Type'] = 'multipart/form-data';
        }
        config.headers = headers;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
    ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }

  public static getToken() {
    return localStorage.getItem('token');
  }

  static getHeaders() {
    const token = ApiClient.getToken();
    let headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers;
  }

  post(url: string, data?: any, config?: any) {
    return this.axiosInstance.post(url, data, { ...config });
  }
  

  get(url: string, config?: any) {
    return this.axiosInstance.get(url, config);
  }

  put(url: string, data?: any, config?: any) {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url: string, config?: any) {
    console.log("DELEte config ",config);
    return this.axiosInstance.delete(url,  { ...config });
  }
}

const apiClient = ApiClient.getInstance();

export default apiClient;
