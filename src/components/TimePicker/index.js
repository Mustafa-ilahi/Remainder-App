import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'moment';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export default function TimePicker({navigation}) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const email = useSelector(state => state.email);
  const userName = useSelector(state => state.name);

  const showDateTimePicker = () => {
    if (title !== '' && description !== '') {
      setIsDatePickerVisible(true);
      setError('');
    } else if (title == '') {
      setError('Title is required');
    } else if (description == '') {
      setError('Description is required');
    }
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const idGenerator = () => {
    let length = 5;
    let result = '';
    let characters = '0123456789';
    for (let i = 0; i < characters.length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() + characters.length),
      );
    }
    return result;
  };
  const handleConfirm = dateTime => {
 
    Moment.locale('en');
    const time = Moment(dateTime).format('hh:mm A');
    const date = Moment(dateTime).format('d/m/YY');
    console.log(time);
    console.log(date);
    const alarmNotifData = {
      id: idGenerator(),
      userName: userName,
      email: email,
      title: title,
      message: description,
      ticker: description,
      auto_cancel: true,
      vibrate: true,
      vibration: 100,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: null,
      color: 'red',
      schedule_once: true,
      tag: 'some_tag',
      fire_date: Date.now(),
      date: date,
      time: time,
    };
    firestore()
      .collection('Alarms')
      .add(alarmNotifData)
      .then(() => {
        navigation.navigate('Alarm Details');
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/alarm.gif')}
        style={{height: 200, width: 270, alignSelf: 'center'}}
      />
      <View style={styles.welcomeBackView}>
        <Text style={styles.welcomeBack}>Alarm Details</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Alarm Title"
          activeUnderlineColor="#000"
          onChangeText={text => setTitle(text)}
          value={title}
          style={styles.title}
          underlineColor="transparent"
        />
        <TextInput
          label="Alarm Description"
          activeUnderlineColor="#000"
          onChangeText={text => setDescription(text)}
          value={description}
          style={styles.description}
          underlineColor="transparent"
        />
      </View>
      <View>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.addAlarm}>
        <Button
          title="+ Add Alarm"
          color={'#122e6e'}
          onPress={showDateTimePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.4,
  },
  welcomeBackView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#122e6e',
    paddingLeft: 7,
    paddingTop: Dimensions.get('window').height * 0.05,
  },
  form: {
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  title: {
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  description: {
    marginTop: 15,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  addAlarm: {
    marginTop: 20,
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    paddingLeft: Dimensions.get('window').width * 0.06,
    paddingTop: 5,
  },
});
