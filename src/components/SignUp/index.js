import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Menu,
  Provider,
  ActivityIndicator,
  Colors,
  TextInput,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import firebase from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
const {auth} = firebase();
import {storeData} from '../../store/action';

export default function SignUp({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const createAnAccount = async () => {
    setLoader(true);
    try {
      if (userName !== '' && email !== '' && password !== '') {
        setError('');
        const signUp = await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            dispatch(storeData(email,userName));
            firestore()
              .collection('Users')
              .add({
                userName,
                email,
              })
              .then(() => {
                setLoader(false);
                navigation.navigate('Dashboard');
              });
          });
      } else if (userName == '') {
        setError('Username is required');
        setLoader(false);
      } else if (email == '') {
        setError('Email is required');
        setLoader(false);
      } else if (password == '') {
        setError('Password is required');
        setLoader(false);
      }
    } catch (error) {
      setError(error.message.split(']')[1]);
      setLoader(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/signup.jpeg')}
          style={{height: 220, width: '100%', paddingTop: 0, marginTop: 0}}
        />

        <View style={styles.signUpView}>
          <Text style={styles.welcomeBack}>Sign up</Text>
          <Text style={styles.signUpText}>Create an account</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Username"
            activeUnderlineColor="#000"
            onChangeText={text => setUserName(text)}
            value={userName}
            style={styles.userName}
            underlineColor="transparent"
          />
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
        <View style={{marginBottom: 5}}>
          {error !== '' && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
                paddingLeft: 5,
                paddingTop: 5,
              }}>
              {error}
            </Text>
          )}
        </View>
        <View style={styles.createAccountBtn}>
          <TouchableOpacity onPress={createAnAccount}>
            {loader ? (
              <ActivityIndicator animating={true} color={'#fff'} />
            ) : (
              <Text style={styles.createAccountBtnText}>Create an account</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.alreadyMember}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.signin}>
              Sign in
            </Text>
          </Text>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            By signing up, you're agree to our{' '}
            <Text style={styles.footerBold}>Terms of Use</Text> and{' '}
            <Text style={styles.footerBold}>Privacy & Policy.</Text>
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
  signUpView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#122e6e',
    paddingLeft: 7,
  },
  signUpText: {
    color: '#122e6e',
    paddingTop: 10,
    fontSize: 14,
    paddingLeft: 7,
    paddingBottom: 10,
  },
  form: {
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  userName: {
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  email: {
    marginTop: 10,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  passwordText: {
    paddingTop: 20,
  },
  password: {
    marginTop: 10,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  createAccountBtn: {
    backgroundColor: '#122e6e',
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  createAccountBtnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  alreadyMember: {
    paddingTop: 20,
    color: '#122e6e',
  },
  signin: {fontWeight: 'bold'},
  footerView: {paddingTop: 15, width: Dimensions.get('window').width * 0.7},
  footerText: {fontSize: 16, color: '#000'},
  footerBold: {fontWeight: 'bold', color: '#122e6e'},
});
