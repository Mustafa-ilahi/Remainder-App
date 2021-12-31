import React, {useState} from 'react';
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
export default function Dashboard() {
  const email = useSelector(state => state.email);
  const [alarm, setAlarm] = useState('');
  return (
    <View>
      {alarm == '' ? (
        <View>
          <Image
            source={require('../../assets/alarm-2.png')}
            style={styles.image}
          />
          <Text style={styles.text}>ɴᴏ ʀᴇᴍᴀɪɴᴅᴇʀꜱ ʏᴇᴛ!</Text>
        </View>
      ) : (
        <Text>Data ha</Text>
      )}
      <View style={styles.addIcon}>
        <TouchableOpacity>
          <Icon name="pluscircle" color={'#122e6e'} size={60} />
        </TouchableOpacity>
      </View>
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
  image: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.4,
    marginTop: Dimensions.get('window').height * 0.2,
    alignSelf: 'center',
  },
});
