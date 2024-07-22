import React from 'react';
import { Button, View, Text, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Logo from '../components/logo';
import GetStartedButton from '../components/getStartedButton';

function LandingPage() {
  return (
    <View>
      
      <View display="flex" justifyContent="space-between" padding="10px">
        <Logo />
        <GetStartedButton align-items="end"/>
      </View>

      <View padding="100px 20px" textAlign="center">
        <Text as="h1" fontSize="3em" margin="0">
          Your Ultimate Guide To Plant Care
        </Text>
        <Text as="p" fontSize="1.2em">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Ac auctor augue mauris augue neque gravida.
        </Text>
      </View>
      
    </View>
  );
}

export default LandingPage;