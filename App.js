import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigator from './src/config/navigation';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
