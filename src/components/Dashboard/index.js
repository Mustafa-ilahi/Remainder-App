import React, {useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Dashboard() {
  const email = useSelector(state => state.email);
  const [alarm, setAlarm] = useState('');
  return (
    <View>
      {/* <Text>Dashboard here</Text> */}
      {alarm == '' ? (
        <View>
          <Image
            source={require('../../assets/alarm-2.png')}
            style={{
              height: Dimensions.get('window').height * 0.30,
              width: Dimensions.get('window').width * 0.4,
              marginTop: Dimensions.get('window').height * 0.2,
              alignSelf:"center"
            }}
          />
          <Text style={styles.text}>ɴᴏ ʀᴇᴍᴀɪɴᴅᴇʀꜱ ʏᴇᴛ!</Text>
        </View>
      ) : (
        <Text>Data ha</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginTop:Dimensions.get("window").height * 0.05,
    textAlign: 'center',
    color: '#808080',
    fontWeight:"bold"
  },
});
