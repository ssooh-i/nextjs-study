import axios, { AxiosRequestConfig } from "axios";
import { ApiResult } from "../../types/http-api/axiosInstanceTypes";

const API = axios.create({ baseURL: "" });

/**
* GET HTTP 요청을 처리하는 API 유틸 함수
  @param url 요청을 전송할 Url
  @param config Axios 요청 관련 config(AxiosRequestConfig)
  @returns 요청 결과와 결과값 리턴
*/
export async function getAsync(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResult> {
  try {
    const response = await API.get(url, {
      responseType: "json",
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: err };
  }
}

/**
  POST HTTP 요청을 처리하는 API 유틸 함수
  @param url 요청을 전송할 Url
  @param data body에 넣어 보낼 데이터
  @param config Axios 요청 관련 config(AxiosRequestConfig)
  @returns 요청 결과와 결과값 리턴
*/
export async function postAsync<D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResult> {
  try {
    const response = await API.post(url, data, {
      responseType: "json",
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: err };
  }
}

/**
  patch HTTP 요청을 처리하는 API 유틸 함수
  @param url 요청을 전송할 Url
  @param data body에 넣어 보낼 데이터
  @param config Axios 요청 관련 config(AxiosRequestConfig)
  @returns 요청 결과와 결과값 리턴
*/
export async function patchAsync<D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
): Promise<ApiResult> {
  try {
    const response = await API.patch(url, data, {
      responseType: "json",
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: err };
  }
}

/**
  put HTTP 요청을 처리하는 API 유틸 함수
  @param url 요청을 전송할 Url
  @param data body에 넣어 보낼 데이터
  @param config Axios 요청 관련 config(AxiosRequestConfig)
  @returns 요청 결과와 결과값 리턴
*/
export async function putAsync<D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
): Promise<ApiResult> {
  try {
    const response = await API.put(url, data, {
      responseType: "json",
      ...config,
    });

    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: err };
  }
}

/**
    delete HTTP 요청을 처리하는 API 유틸 함수
    @param url 요청을 전송할 Url
    @param data body에 넣어 보낼 데이터
    @param config Axios 요청 관련 config(AxiosRequestConfig)
    @returns 요청 결과와 결과값 리턴
  */
export async function deleteAsync<D>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResult> {
  try {
    const response = await API.delete(url, {
      responseType: "json",
      ...config,
    });

    console.log(response.data);

    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: err };
  }
}
