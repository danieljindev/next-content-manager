import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { GlobalStateProvider } from '../../contexts/GlobalStateContext';
import theme from '../../theme';
import Navbar from './Navbar';

export interface MainLayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <GlobalStateProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
    </ThemeProvider>
  </GlobalStateProvider>
);

export default MainLayout;
