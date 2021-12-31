import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Text, Switch, Drawer, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {removeData} from '../../store/action';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.name);
  const signOut = () => {
    dispatch(removeData());
    setTimeout(() => {
      props.navigation.navigate('Auth');
    }, 2000);
  };

  const DrawerScreenDecider = () => {
    props.navigation.navigate('Alarm Details');
  };
  return (
    <View style={styles.mainView}>
      <DrawerContentScrollView {...props}>
        <View style={styles.mainView}>
          <StatusBar animated="auto" />
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.drawerMainView}>
              <View style={styles.drawerView}>
                <Avatar.Image
                  source={require('../../assets/user2.png')}
                  size={70}
                />
                <View style={styles.titleView}>
                  <Title style={styles.title}>{userName}</Title>
                </View>
              </View>
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.secondSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={DrawerScreenDecider}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="logout" color={color} size={size} />
              )}
              label="Sign Out"
              onPress={signOut}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {flex: 1},
  drawerSection: {
    marginTop: -5,
    backgroundColor: '#122e6e',
    justifyContent: 'center',
  },
  drawerMainView: {
    paddingLeft: Dimensions.get('window').height * 0.05,
    paddingTop: Dimensions.get('window').height * 0.05,
    marginBottom: Dimensions.get('window').height * 0.09,
  },
  drawerView: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  titleView: {marginLeft: 15},
  title: {fontSize: 17, marginTop: 15, color: 'white'},
  secondSection: {marginTop: 15},

  signOut: {
    backgroundColor: '#1A202E',
    width: 120,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    // marginLeft: 10,
  },
  signOutText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
