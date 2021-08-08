import React from 'react';
import { HashLoader } from 'react-spinners';

export interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => (
  <HashLoader color='#36D7B7' loading={loading} size={100} />
);

export default Loading;
