import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/redux/store';
import getNewRefreshToken from '@/api/getNewRefreshToken';
import { setOnboardingModalState } from '@/redux/OnboardingStateSlice';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	// timeout: 1000,
});

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers.common.crossDomain = true;
axiosInstance.defaults.headers.common['Access-Control-Max-Age'] = '600';
axiosInstance.interceptors.request.use(
	async (config) => {
		if (
			config.headers !== undefined &&
			config.headers.Authorization === undefined
		) {
			const accessToken = store?.getState()?.authentication?.accessToken;
			config.headers.Authorization = `Bearer ${accessToken as string}`;
		}
		return config;
	},
	(error) => {
		void Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		if (error instanceof AxiosError) {
			if (error.config !== undefined) {
				const accessToken = store.getState().authentication.accessToken;
				const axiosConfig: InternalAxiosRequestConfig<any> = error.config;
				if (error?.response?.status === 401) {
					console.log(1);
					if (accessToken === null) {
						console.log(2);
						store.dispatch(setOnboardingModalState(true));
						console.log(error);
						throw error; // at this line
					} else {
						console.log(3);
						const newAccessToken: string | null | undefined =
							await getNewRefreshToken();
						if (newAccessToken !== undefined && newAccessToken !== null) {
							axiosConfig.headers.Authorization = `Bearer ${newAccessToken}`;
							return await axiosInstance(axiosConfig);
						} else {
							throw error;
						}
					}
				} else {
					throw error;
				}
			}
			throw error;
		}
		throw error;
	}
);

export default axiosInstance;
