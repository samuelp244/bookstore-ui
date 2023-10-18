import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavOutlet from '@/Components/common/NavOutlet/NavOutlet';
import { Providers } from '@/Components/common/Provider/provider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<NavOutlet>
				<Component {...pageProps} />
			</NavOutlet>
		</Providers>
	);
}
