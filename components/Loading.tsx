import React from 'react';
import { makeStyles } from '@material-ui/core';
import { HashLoader } from 'react-spinners';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});
export interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HashLoader color='#36D7B7' loading={loading} size={100} />
    </div>
  );
};

export default Loading;
