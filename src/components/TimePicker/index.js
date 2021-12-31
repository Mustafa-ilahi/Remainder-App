import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TimePicker() {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const showDateTimePicker = () => {
    setIsDatePickerVisible(true);
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
    console.log(dateTime);
    hideDatePicker();
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
          // onChangeText={text => setEmail(text)}
          // value={email}
          style={styles.title}
          underlineColor="transparent"
        />
        <TextInput
          label="Alarm Description"
          activeUnderlineColor="#000"
          // onChangeText={text => setEmail(text)}
          // value={email}
          style={styles.description}
          underlineColor="transparent"
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.4,
    // marginTop: Dimensions.get('window').height * 0.2,
    // alignSelf: 'center',
  },
  welcomeBackView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#122e6e',
    paddingLeft: 7,
    paddingTop:Dimensions.get("window").height * 0.05
  },
  form: {
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  title: {
    // marginBottom: 10,
      
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
  },
});
