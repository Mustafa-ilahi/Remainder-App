import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {storeData} from '../../store/action';
import firebase from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
const {auth} = firebase();

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const signIn = () => {
    setLoader(true);
    try {
      if (email !== '' && password !== '') {
        setError('');
        const signIn = auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setLoader(false);
            let data = firestore()
              .collection('Users')
              .where('email', '==', email)
              .get()
              .then(snapshot => {
                snapshot.forEach(item => {
                  dispatch(storeData(item.data().email));
                  navigation.navigate("Dashboard")
                });
              });
          })
          .catch(error => {
            setError(error.message.split(']')[1]);
            setLoader(false);
          });
      } else if (email == '') {
        setError('Email is required');
        setLoader(false);
      } else if (password == '') {
        setError('Password is required');
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/signup.jpeg')}
          style={{height: 260, width: '100%', paddingTop: 0, marginTop: 0}}
        />
        <View style={styles.welcomeBackView}>
          <Text style={styles.welcomeBack}>Welcome Back</Text>
          <Text style={styles.siginText}>Sign in to your account</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            label="Email"
            activeUnderlineColor="#000"
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.email}
            underlineColor="transparent"
          />
          <TextInput
            onChangeText={text => setPassword(text)}
            value={password}
            activeUnderlineColor="#000"
            label="Password"
            style={styles.password}
            underlineColor="transparent"
          />
        </View>
        <View style={{marginTop: 10}}>
          {error !== '' && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
                paddingLeft: 5,
              }}>
              {error}
            </Text>
          )}
        </View>
        <View style={styles.btnView}>
          <View style={styles.button}>
            <TouchableOpacity onPress={signIn}>
              {loader ? (
                <ActivityIndicator animating={true} color={'#fff'} />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signUpView}>
          <Text style={styles.signUpText}>
            Don't have an account?
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signup}>
              {' '}
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  welcomeBackView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#122e6e',
    paddingLeft: 7,
  },
  form: {
    paddingTop: 20,
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  siginText: {
    color: '#122e6e',
    paddingTop: 10,
    fontSize: 14,
    paddingLeft: 10,
  },
  email: {
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  password: {
    marginTop: 10,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  btnView: {paddingTop: 15},
  button: {
    backgroundColor: '#122e6e',
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  signUpView: {paddingTop: Dimensions.get('window').height * 0.13},
  signUpText: {fontSize: 14, color: '#122e6e'},
  signup: {fontWeight: 'bold'},
});
