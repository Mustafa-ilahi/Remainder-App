import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'moment';

export default function TimePicker() {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const showDateTimePicker = () => {
    if (title !== '' && description !== '') {
      setIsDatePickerVisible(true);
      setError('')
    } else if (title == '') {
      setError('Title is required');
    } else if (description == '') {
      setError('Description is required');
    }
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const handleConfirm = dateTime => {
    // let currentTime = Date.now();
    // if (dateTime.getTime() < currentTime) {
    //   alert('Please choose future time');
    //   return;
    // }
    // console.log(dateTime);
    Moment.locale('en');
    const time = Moment(dateTime).format('hh:mm A');
    const date = Moment(dateTime).format('d/m/YY');
    console.log(time);
    console.log(date);
    // hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/alarm.gif')}
        style={{height: 200, width: 270}}
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
