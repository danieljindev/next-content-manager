import { Provider } from 'react-redux';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../store';
import MainLayout from '../components/layouts/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
export default MyApp;
