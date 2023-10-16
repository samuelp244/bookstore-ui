import { addAccessToken, addUserData } from '@/redux/authSlice';
import { store } from '@/redux/store';
import axiosInstance from './axiosInstance';

async function getNewRefreshToken(): Promise<string | null> {
	const refresh = async (): Promise<string | null> => {
		try {
			const response = await axiosInstance.get(`/auth/renewaccesstoken`);

			store.dispatch(addUserData(response?.data));
			store.dispatch(addAccessToken(response?.data));
			return await Promise.resolve(response?.data?.accessToken);
		} catch (error) {
			return await Promise.reject(error);
		}
	};

	return await refresh();
}

export default getNewRefreshToken;
