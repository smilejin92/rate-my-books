import React from 'react';
import withAuth from '../hocs/withAuth';

const Home = () => <div>홈</div>;

export default withAuth(Home, true);
