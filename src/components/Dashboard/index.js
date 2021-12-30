import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
export default function Dashboard() {
  const email = useSelector(state => state.email);
  console.log(email);
  return (
    <View>
      <Text>Dashboard here</Text>
      <Button title='Sign out'/>
    </View>
  );
}
