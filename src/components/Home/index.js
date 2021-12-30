import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/signup.jpeg')}
        style={{height: 220, width: "100%",paddingTop:0,marginTop:0}}
      />
      <Text style={styles.welcomeHeading}>ᴛᴀꜱᴋ ᴍᴏɴɪᴛᴏʀɪɴɢ</Text>
      <Image
        source={require('../../assets/alarm.gif')}
        style={{height: 200, width: 270}}
      />
      <View style={{paddingTop: 20}}>
        <View style={styles.btnView}>
          <View style={styles.signupBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpBtnText}> Sign up with Email Id</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.alreadyMember}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('SignIn')}
          style={styles.signin}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  welcomeHeading: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1A202E',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 30,
  },
    
    btnView: {paddingTop: 20, position: 'relative', top: Dimensions.get("window").height * 0.11,},
  signupBtn: {
    backgroundColor: '#122e6e',
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  signUpBtnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  signin: {fontWeight: 'bold', marginTop: 20,},
  alreadyMember: {
    paddingTop: 10,
    position: 'relative',
    top: Dimensions.get("window").height * 0.11,
    color: '#122e6e',
  },
});
