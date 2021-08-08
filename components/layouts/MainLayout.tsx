import React from 'react';
import { Container, CssBaseline, ThemeProvider, Box, makeStyles } from '@material-ui/core';
import { GlobalStateProvider } from '../../contexts/GlobalStateContext';
import theme from '../../theme';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: '1',
  },
}));

export interface MainLayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Navbar />
          <Container className={classes.container}>
            <Box my={10}>{children}</Box>
          </Container>
        </div>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};

export default MainLayout;
