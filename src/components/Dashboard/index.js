import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

export default function Dashboard({navigation}) {
  const email = useSelector(state => state.email);
  const [alarm, setAlarm] = useState('');
  useEffect(() => {
    let temp = [];
    firestore()
      .collection('Alarms')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          temp.push(item.data());
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
    paddingRight: Dimensions.get('window').height * 0.02,
    marginTop: Dimensions.get('window').height * 0.6,
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
