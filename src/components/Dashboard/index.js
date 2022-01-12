import React, {useEffect, useState} from 'react';
import {
  AppState,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {Divider} from 'react-native-paper';
import Moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';

export default function Dashboard({navigation}) {
  const email = useSelector(state => state.email);
  const [alarm, setAlarm] = useState('');
  const [alarmStatus, setalarmStatus] = useState(false);
  const [aState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState);
      },
    );
    // return () => {
    //   appStateListener?.remove();

    let temp = [];
    firestore()
      .collection('Alarms')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          temp.push(item.data());
          let fireDate = item.data().fire_date;
          let duration = Moment.duration(Moment().diff(fireDate));
          let seconds = duration.asMinutes();
          let res = Math.floor(seconds / 60000);
          console.log(res);
          setTimeout(() => {
            ReactNativeAN.sendNotification(item.data());
            setalarmStatus(true);
            Vibration.cancel()
          }, res);
        });
        setAlarm(temp);
      });
  }, []);
  return (
    <View>
      {alarm == '' ? (
        <>
          <View>
            <Image
              source={require('../../assets/alarm-2.png')}
              style={styles.image}
            />
            <Text style={styles.text}>ɴᴏ ʀᴇᴍᴀɪɴᴅᴇʀꜱ ʏᴇᴛ!</Text>
          </View>
          <View style={styles.addIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('TimePicker')}>
              <Icon name="pluscircle" color={'#122e6e'} size={60} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View>
            <View style={styles.listView}>
              {alarm.map(item => {
                return (
                  <>
                    <ListItem>
                      <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                          {item.title}
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.time}>
                          {item.time}
                        </ListItem.Subtitle>

                        <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.message}>
                          {item.message}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <Button title="Remove" color={'red'} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </View>
            <View style={styles.addIconData}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TimePicker')}>
                <Icon name="pluscircle" color={'#122e6e'} size={60} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginTop: Dimensions.get('window').height * 0.05,
    textAlign: 'center',
    color: '#808080',
    fontWeight: 'bold',
  },
  addIcon: {
    alignSelf: 'flex-end',
    paddingRight: Dimensions.get('window').height * 0.05,
    marginTop: Dimensions.get('window').height * 0.2,
  },
  addIconData: {
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingRight: Dimensions.get('window').height * 0.02,
    marginTop: Dimensions.get('window').height * 0.7,
  },
  image: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.4,
    marginTop: Dimensions.get('window').height * 0.2,
    alignSelf: 'center',
  },
  listView: {
    borderColor: '#FFf',
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 20,
    borderWidth: 5,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: Dimensions.get('window').height * 0.005,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: Dimensions.get('window').height * 0.005,
  },
  message: {
    paddingTop: Dimensions.get('window').height * 0.009,
  },
});
