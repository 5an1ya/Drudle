import React from 'react';
import { View } from '@aws-amplify/ui-react';
import SignOutButton from '../components/signOutButton';

const Dashboard = () => {
  return (
    <View>
      <h1>
        It works!
      </h1>
      <SignOutButton />
    </View>
  );
};

export default Dashboard;