import React, {Fragment, useEffect, useState} from 'react';
import {
  AppState,
  Button,
  Dimensions,
  Image,
  ScrollView,
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
import ReactNativeAN from 'react-native-alarm-notification';
import {useIsFocused} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';

export default function Dashboard({navigation}) {
  const isVisible = useIsFocused();
  const [aState, setAppState] = useState(AppState.currentState);

  const email = useSelector(state => state.email);
  const [alarm, setAlarm] = useState('');
  const [alarmStatus, setalarmStatus] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState);
      },
    );

    getAlarm();
  }, [isVisible]);



  if (aState !== 'active') {
    console.log('ooooook');
    // let temp = [];
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let currentTime = hours + ':' + minutes + ' ' + ampm;
    firestore()
      .collection('Alarms')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          // temp.push(item.data());
          let fireDate = item.data().fire_date;
          let alarmTime = item.data().time;

          if (currentTime == alarmTime) {
            console.log('-----------------<><>',true);
            ReactNativeAN.sendNotification(item.data());

            // setTimeout(() => {
            //   Vibration.cancel();
            // }, 3000);
          }
        });

        // console.log(temp);
      });
  }

  const getAlarm = () => {
    let temp = [];
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let currentTime = hours + ':' + minutes + ' ' + ampm;
    firestore()
      .collection('Alarms')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          temp.push(item.data());
          let fireDate = item.data().fire_date;
          let alarmTime = item.data().time;

          if (currentTime == alarmTime) {
            console.log(true);
            ReactNativeAN.sendNotification(item.data());

            setTimeout(() => {
              Vibration.cancel();
            }, 3000);
          }
        });

        setAlarm(temp);
      });
  };
  const removeAlarm = (item, index) => {
    console.log(index);
    let temp = [...alarm];
    temp.splice(index, 1);
    setAlarm(temp);
  };
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
        <View>
          <ScrollView>
            <View>
              <View style={styles.listView}>
                {alarm.map((item, index) => {
                  return (
                    <Fragment key={index}>
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
                        <Button
                          title="Remove"
                          color={'red'}
                          onPress={() => removeAlarm(item, index)}
                        />
                      </ListItem>
                      <Divider />
                    </Fragment>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <View style={styles.addIconData}>
            <TouchableOpacity onPress={() => navigation.navigate('TimePicker')}>
              <Icon name="pluscircle" color={'#122e6e'} size={60} />
            </TouchableOpacity>
          </View>
        </View>
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
    paddingRight: Dimensions.get('window').height * 0.04,
    marginTop: Dimensions.get('window').height * 0.2,
  },
  addIconData: {
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingRight: Dimensions.get('window').height * 0.03,
    marginTop: Dimensions.get('window').height * 0.82,
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
    marginBottom: Dimensions.get('window').height * 0.02,
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
