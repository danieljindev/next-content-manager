import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from '../Logo';

const AppNavbar = () => {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar>
          <Link href='/'>
            <a>
              <Logo />
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppNavbar;
