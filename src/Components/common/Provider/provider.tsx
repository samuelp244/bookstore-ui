import { store } from '../../../redux/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider>
			<Provider store={store}>{children}</Provider>
		</ChakraProvider>
	);
}
